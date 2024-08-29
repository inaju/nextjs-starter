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
import { generateEventCode } from "@/lib/utils"
import axios from "axios"
import { LocateFixed, VideoIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { DatePickerWithPresets } from "./date-picker"
import FormSelect from "./form-select"
import UploadAndDisplayImage from "./upload-image"

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
    .any().optional(),
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

  const handleSubmit = async (data) => {
    let imageUrl = "win"
    let newData = { ...data }
    if (data?.uimage) {
      const response = await imageUploaded(data?.uimage);
      imageUrl = response
      newData.imageUrl = imageUrl
      mutation.mutate(newData)
    } else {
      mutation.mutate(newData)
    }
    setIsButtonClicked(false)
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
    if (!mutation.isPending && mutation.status==="success") {
      onOpenChange(false)
    }
  };

  const timeValue = [{
    name: "11:00",
    value: "11:00",
  }]
  const meridem = [{
    name: "AM",
    value: "AM",
  },
  {
    name: "PM",
    value: "PM",
  },]

  async function imageUploaded(file) {
    let base64String = ""
    try {

      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = async function () {
          base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
          const formData = new FormData();
          formData.append('image', base64String?.toString());
          resolve(await postImage(formData))
        }
        reader.readAsDataURL(file);
      })
    } catch (err) {
      console.error("Error Converting image to base 64", err)
    }
  }

  const postImage = async (formData) => {
    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_IMGBB_API_KEY}`, formData)
      return response?.data?.data?.url;
    } catch (err) {
      console.error(err, 'error uploading image to imgbb')
      throw new Error(err);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 h-[400px]  overflow-y-scroll overflow-x-hidden pr-4">
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
        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2 ">
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
                  <FormSelect field={field} placeholder={"Enter a value"} selectGroup={<SelectGroup>
                    {timeValue?.map((item) => (
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
          />
          <FormField
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
          />
        </div>
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
        <Button disabled={isButtonClicked} type="submit">
          {isButtonClicked ? "loading..." : "Create"}
        </Button>
      </form>
    </Form>
  )
}


