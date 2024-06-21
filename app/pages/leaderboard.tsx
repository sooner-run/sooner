import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { FiPlus } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import { CgClose } from "react-icons/cg";

const Leaderboard = () => {
  const [modalAction, setModalAction] = useState<"create" | "join" | null>(
    null
  );

  return (
    <DashboardLayout
      title="Leaderboard"
      maintitle="Leaderboard"
      loading={false}
      topBarRightComponent={
        <div className="">
          <Tooltip id="plus" />
          <button
            data-tooltip-id="plus"
            data-tooltip-content="Create or join a board"
          >
            <FiPlus size={20} />
          </button>
        </div>
      }
    >
      <Modal>
        <Card className="max-w-96 px-3 py-7 relative">
          <button className="absolute right-3 top-2">
            <CgClose />
          </button>
          <div className="text-sm">
            <h3 className="text-center mt-2">
              Do you want to join or create a board?
            </h3>
            <div className="flex items-center justify-center gap-x-5 mt-7">
              <button
                className="px-10 py-2 rounded-lg bg-white text-accent font-medium hover:bg-accent hover:text-white transition-colors"
                onClick={() => setModalAction("join")}
              >
                Join
              </button>
              <button
                className="px-10 py-2 rounded-lg bg-white text-accent font-medium hover:bg-accent hover:text-white transition-colors"
                onClick={() => setModalAction("create")}
              >
                Create
              </button>
            </div>
          </div>
        </Card>
      </Modal>
      <div className=""></div>
    </DashboardLayout>
  );
};

export default Leaderboard;
