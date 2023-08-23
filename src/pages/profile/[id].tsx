import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Profile = () => {
  const { data: sessionData } = useSession();
  // const ctx = api.useContext();
  const {
    data: profileData,
    isError,
    isLoading,
  } = api.profile.getUserProfile.useQuery();

  return (
    <div className="container mx-auto mt-4">
      <div className="flex flex-col items-center justify-center">
        <h5 className="mb-2 text-3xl">Welcome {sessionData?.user.name}</h5>
        <p className="mb-5">What are your fitness goals?</p>
        <Form />
      </div>
    </div>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    goalWeight: "",
    caloriesGoal: "",
  });

  console.log(formData);
  const ctx = api.useContext();

  const createProfile = api.profile.createProfile.useMutation({
    onSuccess: (profile) => {
      // void ctx.profile.getUserProfile.invalidate();
      console.log("sucesss", profile);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createProfile.mutate({
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      goalWeight: formData.goalWeight,
      caloriesGoal: formData.caloriesGoal,
    });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="label">
        <span className="label-text">Age</span>
      </label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="e.g 21"
        className="input input-bordered w-full max-w-xs"
      />
      <label className="label">
        <span className="label-text">Height (inches)</span>
      </label>
      <input
        type="number"
        name="height"
        value={formData.height}
        onChange={handleChange}
        placeholder="e.g 70"
        className="input input-bordered w-full max-w-xs"
      />
      <label className="label">
        <span className="label-text">Current weight (lbs)</span>
      </label>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        placeholder="e.g 165"
        className="input input-bordered w-full max-w-xs"
      />
      <label className="label">
        <span className="label-text">Goal Weight (lbs)</span>
      </label>
      <input
        type="number"
        name="goalWeight"
        value={formData.goalWeight}
        onChange={handleChange}
        placeholder="e.g 150"
        className="input input-bordered w-full max-w-xs"
      />
      <label className="label">
        <span className="label-text">Daily calorie goal</span>
      </label>
      <input
        type="number"
        name="caloriesGoal"
        value={formData.caloriesGoal}
        onChange={handleChange}
        placeholder="e.g 2000"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default Profile;
