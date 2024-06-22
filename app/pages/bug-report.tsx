import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useState } from "react";
import { BiSolidInfoCircle } from "react-icons/bi";
import { useLogSnag } from "@logsnag/next";
import { CgSpinner } from "react-icons/cg";

const BugReport = () => {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);

  const { track } = useLogSnag();

  const submitBugReport = () => {
    if (!content) return;
    setSubmitting(true);
    setFailed(false);
    try {
      track({
        channel: "bug-report",
        event: "New Bug Report",
        icon: "🪲",
        description: content,
        notify: true,
      });
      setContent("");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout maintitle="Report a bug" title="Bug Report">
      <div className="max-w-[600px] mx-auto px-5 text-grey-100">
        <p className="flex gap-x-2 border border-accent text-white text-sm bg-accent/10 p-3 rounded-2xl mb-5">
          <BiSolidInfoCircle size={30} />
          This is an early release of Sooner, incase you find a bug feel free to
          report, it will be fixed as soon as possible.
        </p>

        <p className={`${submitted ? "h-4" : "h-0"} my-5 transition-all`}>
          {submitted && "Thank you! Your report has been submitted."}
        </p>
        <p
          className={`${failed ? "h-4" : "h-0"} text-red-500 my-5 transition-all`}
        >
          {failed && "Bug report submission failed, please try again."}
        </p>

        <div className="mt-5">
          <textarea
            placeholder="Describe your issue..."
            className="h-60 w-full rounded-2xl bg-transparent border border-white/20 p-3 outline-none"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
          <button
            className="text-black bg-white px-5 py-3 rounded-xl font-semibold mt-2 text-sm hover:bg-accent hover:text-white transition-colors duration-700 disabled:opacity-50 disabled:pointer-events-none"
            disabled={submitting}
            onClick={submitBugReport}
          >
            {submitting ? (
              <div className="flex items-center gap-x-2">
                Submitting <CgSpinner className="animate-spin" />{" "}
              </div>
            ) : (
              "Submit Report"
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BugReport;
