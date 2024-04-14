'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { info } from "console"
import { useForm } from "react-hook-form"
import { z } from "zod"

const signUpFormSchema = z.object({
  userName: z.string().min(1, {message: '入力必須です'}).max(20, {message: '20文字以下で入力してください'}),
  password: z.string().min(8, {message: '8文字以上で入力してください'}).max(50, {message: '50文字以下で入力してください'})
})

type signUpFormSchemaType = z.infer<typeof signUpFormSchema>

export const SignUpForm = () => {
  const form = useForm<signUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      userName: '',
      password: ''
    },
  })

  const onSubmit =(data: signUpFormSchemaType) => console.log(data)

  const formInfo= {
    userName: {
      id: 1,
      label: 'ユーザー名',
      inputType: 'text',
      inputPlaceholder: 'お名前'
    },
    password: {
      id: 2,
      label: 'パスワード',
      inputType: 'password',
      inputPlaceholder: 'パスワード'
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.keys(formInfo).map(key => {
          const info = formInfo[key]

          return (
          <FormField
          key={info.id}
          control={form.control}
          name={key}
          render={({field}) => (
            <FormItem className="mt-4">
              <FormLabel>{info.label}</FormLabel>
              <FormControl>
                <Input type={info.inputType} placeholder={info.inputPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          )
        })}
        <Button type="submit" className="w-full mt-10">登録</Button>
      </form>
    </Form>
  )
}
