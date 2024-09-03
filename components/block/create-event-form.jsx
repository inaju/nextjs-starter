"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  SelectGroup,
  SelectItem
} from "@/components/ui/select"
import { useHandleEvent } from "@/hooks/useHandleEvent"
import { generateEventCode, generateShortUUID } from "@/lib/utils"
import axios from "axios"
import { LocateFixed, VideoIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { DatePickerWithPresets } from "./date-picker"
import FormSelect from "./form-select"
import UploadAndDisplayImage from "./upload-image"
// import { postImage } from "@/pages/api/upload-image"

import AWS from "aws-sdk";
import S3 from 'aws-sdk/clients/s3'; // Import only the S3 client



const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  eventMode: z.string().min(2, {
    message: "event must be at least 2 characters.",
  }),
  date: z.date({
    message: "date is required",
  }),
  description: z.string().min(2, {
    message: "description is required",
  }),
  image: z
    .any().refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ).optional(),
  time: z.string().min(2, {
    message: "time is required",
  }).optional(),
  meridem: z.string().min(2, {
    message: "meridem must be at least 2 characters.",
  }).optional(),
  setEventCode: z.boolean().default(false).optional(),

})

export function CreateEventForm({ onOpenChange }) {
  const { data: session, ...rest } = useSession()
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    error, data, singleResponse, mutation, isLoading
  } = useHandleEvent();
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      eventMode: "",
    },
  })

  useEffect(() => {
    closeDrawer();
  }, [mutation])
  const handleSubmit = async (data) => {
    let imageUrl = "win"
    let newData = { ...data }
    if (data?.uimage) {
      const file_extension = data?.uimage?.name?.split('.')[1]
      const response = await uploadFile(data?.uimage, `${data.eventOrganizer}_${data.eventCode}_${generateShortUUID(data?.uimage?.name)}.${file_extension}`);
      // const response = await imageUploaded(data?.uimage);
      // const response = await handlePreSignedUrlSubmit(data?.uimage);
      console.log(response, 'response')
      imageUrl = response
      newData.imageUrl = imageUrl,
        mutation.mutate(newData)
      closeDrawer();
    } else {
      mutation.mutate(newData)
      closeDrawer();
    }
    setIsButtonClicked(false)
  }

  const closeDrawer = () => {
    if (!mutation.isPending && mutation.data?.status !== 400 && mutation.data != undefined) {
      onOpenChange(false)
    }
  }
  async function onSubmit(data) {
    setIsButtonClicked(true)
    let newData = { ...data }
    newData.uimage = selectedImage
    newData.eventOrganizer = session?.user?.id;
    newData.userId = session.user.id;
    const code = generateEventCode()

    if (code.length && data.setEventCode) {
      newData.eventCode = code
    } else if (!code.length && data.setEventCode) {
      newData.eventCode = '0123'
    }
    await handleSubmit(newData)

  };


  const uploadFile = async (file, fileName) => {
    const S3_BUCKET = "komi-web";
    const REGION = "us-east-2";
    AWS.config.update({
      accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
    });
    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: file,
    };

    try {
      const upload = await s3.putObject(params).promise();
      if (upload?.$response?.httpResponse.statusCode === 200) {
        return "https://komi-web.s3.us-east-2.amazonaws.com/" + fileName
      }
      alert("File uploaded successfully.");

    } catch (error) {
      console.error(error);
    }

  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 h-[450px]  overflow-y-scroll overflow-x-hidden pr-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Image</FormLabel>
              <FormControl>
                <UploadAndDisplayImage field={field} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Ekdc Conference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2 w-full">
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                  <DatePickerWithPresets field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input placeholder="00:01" type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="meridem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AM/PM</FormLabel>
                <FormControl>
                  <FormSelect field={field} placeholder={""} selectGroup={<SelectGroup>
                    {meridem?.map((item) => (
                      <SelectItem value={item?.value} key={item?.value} >
                        <div className="flex items-center flex-row gap-2">
                          {item?.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <FormField
          control={form.control}
          name="eventMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Mode</FormLabel>
              <FormControl>
                <FormSelect field={field}
                  placeholder={"In person or Virtual"}
                  selectGroup={<SelectGroup>
                    <SelectItem value="in-person" >
                      <div className="flex items-center flex-row gap-2">
                        <LocateFixed />
                        In Person
                      </div>
                    </SelectItem>
                    <SelectItem value="virtual">
                      <div className="flex items-center flex-row gap-2">
                        <VideoIcon />
                        Virtual
                      </div>
                    </SelectItem>
                  </SelectGroup>} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Details</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="setEventCode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Generate Event Code
                </FormLabel>
                <FormDescription>
                  Turn this feature on to ensure that attendees enter a code before signing into an event to ensure that they are really present for that event.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? "loading..." : "Create"}
        </Button>
      </form>
    </Form>
  )
}


