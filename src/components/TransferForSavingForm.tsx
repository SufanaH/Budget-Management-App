import React, { ChangeEvent, useState, FormEvent } from "react";


type TransferForSavingFormPropsType = {
  increaseSavingAmount: (amount: number) => void
  currentBalance: (amount: number) => void
  balance: number;
}

const TransferForSavingForm = (props: TransferForSavingFormPropsType) => {
  const [transferAmount, setTransferAmount] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransferAmount(Number(event.target.value));
    let { name, value } = event.target;
    if (isNaN(Number(value))){
      value = String(transferAmount)
    }
    if(Number(props.balance)> props.balance ){
      value = String(props.balance)
    }
    setTransferAmount(Number(value))
    //console.log(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.increaseSavingAmount(transferAmount);
    props.currentBalance(-transferAmount);
    //--------------------//
    setTransferAmount(0);
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount"> Transfer for saving account </label>
          <input
            type="number"
            name="transfer"
            id="transferAmount"
            value={transferAmount}
            onChange={handleChange}
          />
        </div>
        <button className="transfer"> Transfer </button>
      </form>
      <div className="current-balance">
      <p> Current Balance:</p>
      <h2>{props.balance} EUR </h2>
      </div>
    </div>
  );
};

export default TransferForSavingForm;
