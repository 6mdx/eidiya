import { BlurFade } from '@/components/magicui/blur-fade'
import { TypingAnimation } from '@/components/magicui/typing-animation'
import { BackgroundLines } from '@/components/ui/background-lines'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})


function Home() {

  return (
    <main dir="rtl" className="flex w-full h-screen justify-center">
      <BackgroundLines svgOptions={{ duration: 5 }} className="flex items-center w-full max-w-168 flex-col pt-15 md:pt-40 px-4">
        <div className="flex flex-col items-center gap-2">
          <BlurFade direction="up" delay={0.5} duration={0.6} inView>
            <img draggable={false} className="size-50 md:size-76" src="/eidiya-typo.svg" alt="gift" />
          </BlurFade>
          <div className="flex flex-col gap-2 items-center text-center p-4">
            <TypingAnimation delay={1500} duration={50} className="text-3xl font-bold">إستقبل العيديات المعنوية وخليك من الماديات ✨</TypingAnimation>
            <BlurFade delay={3.8} duration={0.6} inView>أرسل وإستقبل العيديات من أصحابك ومتابعينك على شكل رابط تكتب فيه عيديتك ويمديهم يردون عليك ويكتبون إسمهم أو يخلون إسمهم مجهول 👻</BlurFade>
          </div>
          <BlurFade direction="down" delay={4.5} duration={0.6} inView className="flex flex-col md:flex-row items-center gap-2">
            <Button asChild className="font-bold">
              <Link to="/account">
                إستقبل العيديات 🎉
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a className="flex items-center gap-2" href="https://github.com/6mdx/eidiya" target="_blank">
                تصفح المشروع
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://x.com/6mdx1" target="_blank">
                تابعني على
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
              </a>
            </Button>
          </BlurFade>
        </div>
      </BackgroundLines>
    </main>
  )
}
