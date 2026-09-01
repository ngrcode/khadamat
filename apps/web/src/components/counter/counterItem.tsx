import { cn } from '@/lib/talwindeMergeCn'
import { counterDataType, CountUp, } from '../imports/imports'
import { React } from '../imports/imports'

const CounterItem: React.FC<counterDataType> = ({
  start,
  end,
  duration,
  delay,
  separator,
  decimal,
  icon,
  title,
}) => {
  return (
    <div className={cn("flex flex-col justify-center items-center w-full lg:w-1/4 h-[168px] bg-white  text-blue-600 rounded-3xl border-2 border-orange-500 shadow ")}>
      <div className={cn("flex gap-3 justify-around p-4 items-center ")}>
        {icon}
        <label>{title}</label>
      </div>
      <div className={cn(" text-3xl text-orange-600 font-extrabold")}>
        <CountUp
          start={start}
          end={end}
          duration={duration}
          delay={delay}
          separator={separator}
          decimal={decimal}
        />
      </div>
    </div>
  )
}

export default CounterItem
