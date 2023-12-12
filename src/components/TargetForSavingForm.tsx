import React, { ChangeEvent, useState, FormEvent, useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Validation  from "./Validation";

type TargetForSavingFormPropsType = {
  savingAmount: number;
};

const TargetForSavingForm = (props: TargetForSavingFormPropsType) => {
  const [target, setTarget] = useState(0);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let targetValue = Number(event.target.value);
    setTarget(targetValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTarget(0);
  };

  const savingPercentage = useMemo(() => {
    return Math.min((props.savingAmount / target || 1) * 100, 100);
  }, [props.savingAmount, target]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount"> Set Target </label>
          <input
            type="number"
            name="amount"
            id="targetAmount"
            value={target}
            onChange={handleChange}
          />
        </div>
        <button> Reset</button>
      </form>
      <p> Target: {target}</p>
      <p> Current Saving: {props.savingAmount} </p>
      <p> Progress : {savingPercentage}%</p>
      <progress max={100} value={savingPercentage}></progress>
    </div>
  );
};

export default TargetForSavingForm;
