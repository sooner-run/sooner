import BarChart from "~/components/BarChart";
import DashboardLayout from "~/components/layout/DashboardLayout";
import Card from "~/components/ui/Card";

const Insights = () => {
  return (
    <DashboardLayout title="Insights" maintitle="Insights">
      <div className="px-36">
        <Card className="p-4">
          <h3 className="font-medium">Weekday average</h3>
          <div className="my-4">
            <BarChart
              data={[600000, 203725, 542029, 553902, 908765, 876539, 608741]}
              labels={[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ]}
            />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
