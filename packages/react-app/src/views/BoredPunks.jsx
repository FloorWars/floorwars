import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance } from "../components";

export default function BoredPunks({
  address,
  tx,
  mainnetProvider,
  readContracts,
  writeContracts,
}) {
  const [amount, setNewAmount] = useState(0);
  const [longAmount, setLongAmount] = useState(0);
  const [shortAmount, setShortAmount] = useState(0);

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>BoredPunks:</h2>
        <h4>Collateral Amount (USDC) :</h4>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            onChange={e => {
              setNewAmount(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              let modAmount = amount * (10**6)
              const result = tx(writeContracts.LSP.create(modAmount), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Create Synths!
          </Button>
          <Button
            onClick={() => {
              let modAmount = amount * (10**6)
              /* look how we call setPurpose AND send some value along */
              tx(
                writeContracts.LSP.redeem(modAmount),
              );
              /* this will fail until you make the setPurpose function payable */
            }}
          >
            Redeem
          </Button>
          <Button
            onClick={() => {
              /* look how we call setPurpose AND send some value along */
              tx(
                writeContracts.LSP.expire()
              );
              /* this will fail until you make the setPurpose function payable */
            }}
          >
            Expire
          </Button>

        </div>
        </div>

        <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
          <h4>Settle Amounts (USDC) :</h4>
          <Divider />
          <div style={{ margin: 8 }}>
            <Input
              onChange={e => {
                setLongAmount(e.target.value);
              }}
              placeholder="long amount"
            />
            <Input
              onChange={e => {
                setShortAmount(e.target.value);
              }}
              placeholder="short amount"
            />
            <Button
              style={{ marginTop: 8 }}
              onClick={async () => {
                /* look how you call setPurpose on your contract: */
                /* notice how you pass a call back for tx updates too */
                let modLong = longAmout * (10**6)
                let modShort = shortAmount * (10**6)
                const result = tx(writeContracts.LSP.settle(modLong, modShort), update => {
                  console.log("📡 Transaction Update:", update);
                  if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                      " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                  }
                });
                console.log("awaiting metamask/web3 confirm result...", result);
                console.log(await result);
              }}
            >
              Settle
            </Button>
          </div>
        </div>
    </div>
  );
}
