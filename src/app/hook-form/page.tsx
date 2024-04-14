'use client'
import { Counter } from "@/components/common/Counter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { on } from "events";
import { FormInput } from "lucide-react";
import { register } from "module";
import { useForm } from "react-hook-form";
import { z } from "zod";


// https://github.com/colinhacks/zod/blob/v3.21.4/src/locales/en.ts#L4-L134
// 共通バリデーションを上書き
export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      if (issue.type === "string") {
        // return {
        //   issue.minimum === 1 ? {message: "入力必須です"} : {message: `${issue.minimum}文字以上で入力してください`
        //   // message: "入力必須です"
        // };
        const message = issue.minimum > 1 ? `${issue.minimum}文字以上で入力してくだい` : "入力必須です"
        return {message}
      }
      break;
    case z.ZodIssueCode.too_big:
      if (issue.type === "string") {
        return {
          message: `${issue.maximum}文字以下で入力してください`
        };
      }
      break;
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        return {
          message: "メールアドレスの形式が合っていません"
        };
      }
  }
  return {
    message: ctx.defaultError
  };
};

z.setErrorMap(customErrorMap);

export default function Page () {

  // const formSchema = z.object({
  //   userName: z.string().min(1, {message: "ユーザー名は1文字以上入力してね"}).max(50),
  // })

  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     userName: 'aa'
  //   }
  // })

  type FormInput = {
    userName: string
    password: string
  }

  const signUpFormSchema = z.object({
    // userName: z.string().min(1, {message: '入力必須'}),
    userName: z.string().min(3, {message: 'aho'}),
    password: z.string().min(8, {message: "8文字以上でよろ"})
  })

  type signUpFormSchemaType = z.infer<typeof signUpFormSchema>

  const { register, handleSubmit, control, formState: { errors}, getValues }  = useForm<signUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    // 初回のバリデーション実行タイミングを決める
    // mode: 'onChange',
  })


  const onSubmit =(data: signUpFormSchemaType) => console.log(data)

  console.log('bbb')

  console.log("get",getValues('userName'))

  return (
    <>
    <Card className="max-w-[900px] m-2 bg-red-200">
      <CardHeader className="text-center bg-slate-200">
        <CardTitle>会員登録</CardTitle>
      </ CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>ユーザー名</label>
            <input {...register("userName")} />
            <Counter name="userName" control={control}>
              {(count) => <span>{count}文字</span>}
            </Counter>
            {errors.userName && <p>{errors.userName.message}</p>}
          </div>
          <div>
            <label>パスワード</label>
            <input id="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit">サインイン</button>
        </form>
        {/* <form className="">
          <div>
            <label>ユーザー名</label>
            <Input type="text" placeholder="mytty" />
          </div>
          <div className="mb-2">
            <label>パスワード</label>
            <Input type="password" placeholder="パスワード" />
          </div>
          <Button className="w-full">送信</Button>
        </form> */}
      </CardContent>
    </Card>
    </>
  )
}