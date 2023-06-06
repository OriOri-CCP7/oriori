import Card from "../components/Card";
// import React, { FC } from 'react';
import DropdownMenu from "../components/DropdownMenu"

const Testpage = () => {
    return (
        <>
        <div>
            <DropdownMenu labelName="ThisIsOriOri!" onChange= {()=> {}} />
        <span>
        <Card productName="StarFat: JK style rule breaking Latte" img_url="https://i.ibb.co/NnGtqMb/PSU-Unkonwn-Unit-basic04.png" offerStart="2023-06-30" offerEnd="2023-07-31" className="" onClick={() => {}} favoriteNumber={0}></Card>
        </span><span>
        <Card productName="StarFat: Double Split Banana Latte" img_url="" offerStart="2023-06-01" offerEnd="2023-06-05" className="" onClick={() => {}} favoriteNumber={10}></Card>
        </span><span>
        <Card productName="McDannie: Chounibyou Mango Shake" img_url="" offerStart="2023-06-04" offerEnd="2023-06-12" className="" onClick={() => {}} favoriteNumber={2999}></Card>
        </span><span>

        <Card productName="Stevenson Beer since 1932 special favour with decomposed snail" img_url="" offerStart="2023-06-04" offerEnd="2023-06-06" className="" onClick={() => {}} favoriteNumber={22}></Card>
        </span><span>
        <Card productName="SnowBall Winter Special with Extra sakura" img_url="" offerStart="2023-06-04" offerEnd="null" className="" onClick={() => {}} favoriteNumber={889}></Card>
        </span><span>
        <Card productName="EyesBall Soup with witches hair favour" img_url="" offerStart="null" offerEnd="null" className="" onClick={() => {}} favoriteNumber={1999}></Card>
        </span>
        <span>
        <Card productName="Hell With It Special Hot & spciy Chicken Summer Special" img_url="" offerStart="2023-06-01" offerEnd="2024-07-31" className="" onClick={() => {}} favoriteNumber={399999}></Card>
        </span>
        <span>
        <Card productName="Springfield Bart Simpson Spring Edition" img_url="" offerStart="2023-06-10" offerEnd="2023-06-10" className="" onClick={() => {}} favoriteNumber={8999}></Card>
        </span>
        </div>
        </>

    )
}
export default Testpage;