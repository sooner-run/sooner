import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { FiPlus } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import { CgClose } from "react-icons/cg";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Leaderboard = () => {
  const [modalAction, setModalAction] = useState<"create" | "join" | null>(
    null
  );

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

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
            onClick={() => setModalAction(null)}
          >
            <FiPlus size={20} />
          </button>
        </div>
      }
    >
      <AnimatePresence>
        <Modal>
          <Card className="max-w-96 px-3 py-7 relative">
            <button
              className="absolute right-3 top-2"
              onClick={() => setModalAction(null)}
            >
              <CgClose />
            </button>
            <AnimatePresence mode="wait">
              {!modalAction && (
                <motion.div
                  key="default"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                >
                  <h3 className="text-center">
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
                </motion.div>
              )}
              {modalAction === "join" && (
                <motion.div
                  key="join"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                >
                  <button
                    className="absolute left-3 top-2"
                    onClick={() => setModalAction(null)}
                  >
                    <MdOutlineKeyboardBackspace />
                  </button>
                  <h3 className="text-center">Enter invite code</h3>
                  <input
                    type="text"
                    className="w-full bg-transparent p-2 text-center text-lg rounded-lg border border-grey-100/20 mt-5"
                  />
                  <button className="w-full mt-4 py-2 rounded-lg bg-white text-accent font-medium hover:bg-accent hover:text-white transition-colors">
                    Join
                  </button>
                </motion.div>
              )}
              {modalAction === "create" && (
                <motion.div
                  key="create"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                >
                  <button
                    className="absolute left-3 top-2"
                    onClick={() => setModalAction(null)}
                  >
                    <MdOutlineKeyboardBackspace />
                  </button>
                  <h3 className="text-center">Create a board</h3>
                  <input
                    type="text"
                    placeholder="Board name"
                    className="w-full bg-transparent p-2 rounded-lg border border-grey-100/20 mt-5"
                  />
                  <button className="w-full mt-4 py-2 rounded-lg bg-white text-accent font-medium hover:bg-accent hover:text-white transition-colors">
                    Create board
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </Modal>
      </AnimatePresence>
      <div className=""></div>
    </DashboardLayout>
  );
};

export default Leaderboard;
