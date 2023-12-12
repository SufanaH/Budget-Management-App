import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IncomeForm from "./IncomeForm";
import ExpenceForm from "./ExpenceForm";
import TargetForSavingForm from "./TargetForSavingForm";
import TransferForSavingForm from "./TransferForSavingForm";

const BudgetApp = () => {
  const [savingAmount, setSavingAmount] = useState(0);
  const [balance, setBalance] = useState<number>(0);

  const increaseSavingAmount = (amount: number) => {
    setSavingAmount(amount + savingAmount);
  };

  const currentBalance = (amount: number) => {
    setBalance(amount + balance);
  };

  return (
    <div>
      <title> Budget Managment </title>
      <h1> Budget App</h1>
      <ToastContainer />
      <div className="cards-section">
        <IncomeForm currentBalance={currentBalance} />
        <ExpenceForm currentBalance={currentBalance} />
        <TargetForSavingForm savingAmount={savingAmount} />
      </div>
      <TransferForSavingForm
        increaseSavingAmount={increaseSavingAmount}
        balance={balance}
        currentBalance={currentBalance}
      />
      <footer> © Copyright Sufana </footer>
    </div>
  );
};

export default BudgetApp;
