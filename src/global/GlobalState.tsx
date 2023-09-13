import { atom, RecoilState } from "recoil";
// import { recoilPersist } from "recoil-persist";
// const { persistAtom } = recoilPersist();

interface iUser {}

export const userState: any = atom({
  key: "userState",
  default: "" || null,
  //   effects_UNSTABLE: [persistAtom],
});

export const toggle: any = atom({
  key: "toggle",
  default: false,
  //   effects_UNSTABLE: [persistAtom],
});
