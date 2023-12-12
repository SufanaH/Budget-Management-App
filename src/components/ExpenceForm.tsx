import React, { ChangeEvent, useState, FormEvent } from "react";
import IncomeExpenceTypes from "../types/componenttypes";


import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type ExpenseProps = {
  currentBalance: (amount: number) => void;
};

const ExpenceForm = (props: ExpenseProps) => {
  const [expence, setExpence] = useState<IncomeExpenceTypes>({
    source: "",
    amount: 0,
    date: "",
    id: "",
  });

  const [expences, setExpences] = useState<IncomeExpenceTypes[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    if (Number(value) < 0) {
      if (name === "amount") {
        value = String(expence.amount);
      }
      setExpence((prevExpence) => {
        return { ...prevExpence, [name]: Number(value) };
      });
    } else {
      setExpence((prevExpence) => {
        return { ...prevExpence, [name]: value };
      });
    }
  };

  const handleExpenceeSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.currentBalance(-expence.amount);
    if (expence.source && expence.amount && expence.date) {
      const newExpence = { ...expence, id: uuidv4() };
      setExpences((prevExpences) => {
        return [...prevExpences, newExpence];
      });
      toast.success("Expense has added to the form");
    } else {
      toast.error("You should full all the form");
    }
  };

  const handleDelete = (id: string) => {
    const filterExpences = expences.filter((expence) => expence.id !== id);
    const updateBalance = expences.find((expence) => expence.id == id);
    setExpences(filterExpences);
    if (updateBalance) {
      props.currentBalance(updateBalance.amount);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleExpenceeSubmit}>
        <div>
          <label htmlFor="source"> Expense Source </label>
          <input
            type="text"
            name="source"
            id="expenceSource"
            value={expence.source}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount"> Amount of Expense </label>
          <input
            type="number"
            name="amount"
            id="expenceAmount"
            value={expence.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date"> Date of Expense </label>
          <input
            type="date"
            name="date"
            id="expenceDate"
            value={expence.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit"> Add Expense</button>
      </form>
      <ul>
        {expences.length > 0 ? (
          expences.map((expence, id) => (
            <li key={id}>
              {expence.source}: {expence.amount} EUR on {expence.date}
              <button
                onClick={() => {
                  handleDelete(expence.id);
                }}

              >
                ⌫
              </button>
            </li>
          ))
        ) : (
          <p> Empty </p>
        )}
      </ul>
    </div>
  );
};

export default ExpenceForm;
