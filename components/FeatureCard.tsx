import { LucideIcon } from 'lucide-react'
function FeatureCard ({
    icon:Icon,
    title,
    description,
}:{
    icon:LucideIcon;
    title:string;
    description:string;
})  {
  return (
    <div className='group glass-card w-full max-w-sm rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30'>
        <div className='mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20'>
        <Icon className='w-6 h-6 text-primary'/>
        </div>
        <h3 className='mb-2 text-xl font-semibold tracking-tight'>{title}</h3>
        <p className='text-sm leading-6 text-muted-foreground'>{description}</p>
    </div>
  )
}

export default FeatureCard