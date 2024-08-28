"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import {
  SelectGroup,
  SelectItem
} from "@/components/ui/select"
import { LocateFixed, VideoIcon } from "lucide-react"
import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { DatePickerWithPresets } from "./date-picker"
import FormSelect from "./form-select"
import UploadAndDisplayImage from "./upload-image"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { postEvent } from "@/services"
import { useHandleEvent } from "@/hooks/useHandleEvent"
import { useRouter } from "next/router"

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
    .any(),
  time: z.string().min(2, {
    message: "time is required",
  }),
  meridem: z.string().min(2, {
    message: "meridem must be at least 2 characters.",
  }),
})

export function CreateEventForm({ onOpenChange }) {
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

    }
  }


  async function onSubmit(data) {
    setIsButtonClicked(true)
    let newData = { ...data }
    newData.uimage = selectedImage
    await handleSubmit(newData)
    if (!isLoading && singleResponse?.eventId) {
      onOpenChange(false)
    }
    setIsButtonClicked(false)

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

  let base64String = ""
  async function imageUploaded(file) {
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
  }

  const postImage = async (formData) => {
    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_IMGBB_API_KEY}`, formData)
      return response?.data?.data?.url;
    } catch (err) {
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
                  <FormSelect field={field} placeholder={"00:00"} selectGroup={<SelectGroup>
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
                  <FormSelect field={field} placeholder={"AM"} selectGroup={<SelectGroup>
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
        <Button disabled={isButtonClicked} type="submit">
          {isButtonClicked ? "loading..." : "Create"}
        </Button>
      </form>
    </Form>
  )
}


