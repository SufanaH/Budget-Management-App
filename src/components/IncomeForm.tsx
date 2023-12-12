import React, { ChangeEvent, useState, FormEvent } from "react";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import IncomeExpenceTypes from "../types/componenttypes";
//import { IncomeExpenceTypes } from './Validation'; 


//type IncomeExpenceTypes = z.infer<typeof IncomeExpenceTypes>;

//z.number().positive({ message: "this👏is👏too👏big"});


type IncomeProps = {
  currentBalance: (amount: number) => void;
};

const IncomeForm = (props: IncomeProps) => {
  const [income, setIncome] = useState<IncomeExpenceTypes>({
    source: "",
    amount: 0,
    date: "",
    id: "",
  }); 



  const [incomes, setIncomes] = useState<IncomeExpenceTypes[]>([]);



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;

    if (name == "amount") {
      if (isNaN(Number(value))) {
        value = String(income.amount);
      } 
      setIncome((prevIncome) => {
        return { ...prevIncome, [name]: Number(value) };
      });
    } else {
      setIncome((prevIncome) => {
        return { ...prevIncome, [name]: value };
      });
    }
  };


  console.log(incomes);

  const handleIncomeSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.currentBalance(income.amount);
    if (income.source && income.amount && income.date) {
      const newIncom = { ...income, id: uuidv4() };
      setIncomes((prevIncomes) => {
        return [...prevIncomes, newIncom];
      });
      //console.log(newIncom)
      toast.success("Salary has added to Income");
    } else {
      toast.error("You should full all the form");
    }
  };



  const handleDelete = (id: string) => {
    const filterIncomes = incomes.filter((income) => income.id !== id);
    const updateBalance = incomes.find((income) => income.id == id);
    setIncomes(filterIncomes);
    if (updateBalance) {
      props.currentBalance(-updateBalance.amount);
    }
  };



  return (
    <div className="container">
      <form onSubmit={handleIncomeSubmit}>
        <div>
          <label htmlFor="source"> Income Source </label>
          <input
            type="text"
            name="source"
            id="incomeSource"
            value={income.source}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount"> Amount of income </label>
          <input
            type="number"
            name="amount"
            id="incomeAmount"
            value={income.amount}
            onChange={handleChange}
            
            required
          />
        </div>
        <div>
          <label htmlFor="date"> Date of income </label>
          <input
            type="date"
            name="date"
            id="incomeDate"
            value={income.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit"> Add Income</button>
      </form>
      <ul>
        {incomes.length > 0 ? (
          incomes.map((income, id) => (
            <li key={id}>
              {income.source}: {income.amount} EUR on {income.date}
              <button
                onClick={() => {
                  handleDelete(income.id);
                }}
              >
                {" "}
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

export default IncomeForm;
