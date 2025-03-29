import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/success')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div dir='rtl' className='min-h-svh size-full lg:grid-cols-2 grid items-center justify-center overflow-hidden'>
      <div className="flex flex-col flex-1 gap-8 items-center justify-center">
        <div className="w-full flex flex-col items-center gap-4 max-w-lg">
          <div className='flex flex-col items-center text-center gap-4'>
            <h1 className='text-2xl font-bold'>تم إرسال العيدية بنجاح 😍</h1>
            <p className='text-md whitespace-pre-line'>إذا حاب تسوي لك رابط جديد عشان أنت تستقبل العيديات كمان</p>
          </div>
          <Button asChild className="font-bold w-fit">
            <Link to="/account">
              إستقبل العيديات 🎉
            </Link>
          </Button>
        </div>

      </div>

      <div className="relative size-full hidden lg:block">
        <img
          src="/fireworks.jpg"
          alt="fireworks"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}