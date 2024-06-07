import { PiMagicWandBold } from "react-icons/pi";
import IconThing from "../IconThing";
import { MdOutlineMultilineChart } from "react-icons/md";
import LineChart from "../LineChart";
import { LuGoal } from "react-icons/lu";
import { TbCalendarSmile } from "react-icons/tb";

const Features = () => {
  const feats = [
    {
      title: "Stunning user interface",
      icon: PiMagicWandBold,
      bg: (
        <img
          src="/ui.png"
          className="w-full h-full object-cover rounded-2xl hover:scale-110 transition-all duration-700"
          alt=""
        />
      ),
    },
    {
      title: "Powerful analytics",
      icon: MdOutlineMultilineChart,
      bg: (
        <LineChart
          data={[2, 5, 4, 6, 7]}
          labels={["Monday", "Tuseday", "Wednesday", "Thursday", "Friday"]}
          hideYaxisLabels
        />
      ),
    },
    {
      title: "Goal tracking",
      icon: LuGoal,
    },
    {
      title: "Weekly reports",
      icon: TbCalendarSmile,
    },
  ];

  return (
    <div className="p-20">
      <h1 className="text-6xl font-semibold">Everything you need</h1>
      <p className="text-lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto!
      </p>

      <div className="grid grid-cols-2 gap-4 mt-10">
        {feats.map((f, i) => (
          <div
            className="border border-white/5 rounded-2xl h-[400px] relative overflow-hidden"
            key={i}
          >
            {f.bg}

            <div className="absolute pointer-events-none w-full h-full rounded-2xl bg-gradient-to-b from-transparent via-zinc-900/90 to-zinc-900 top-0 right-0 flex items-end p-5">
              <div className="flex flex-col">
                {f.icon && (
                  <IconThing icon={f.icon} className="!bg-accent text-white" />
                )}
                <h2 className="text-white text-lg mt-1">{f.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
