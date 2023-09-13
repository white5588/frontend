import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../global/GlobalState";
import { useState } from "react";

const HomeScreen = () => {
  const [state, setState] = useRecoilState(userState);
  const value24: any = useRecoilValue(userState);
  const [newState, setNewState] = useState();

  // console.log("showing User", value24);
  return (
    <div>
      <div>showing</div>
      {/* <div>reading value: {value24}</div> */}

      <input
        className="w-[300px] p-3 border rounded mr-2"
        value={newState}
        placeholder="Enter a Name"
        onChange={(e: any) => {
          setNewState(e.target.value);
        }}
      />

      <button
        onClick={() => {
          setState(newState);
        }}
      >
        Add
      </button>
      <br />
      <br />
      <br />
      <br />
      <div>{value24?.id}</div>
    </div>
  );
};

export default HomeScreen;
