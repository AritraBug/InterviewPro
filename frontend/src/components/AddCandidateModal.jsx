import { useState } from "react";

function AddCandidateModal({
  isOpen,
  onClose,
  onSubmit
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      college: "",
      skills: ""
    });

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

    setFormData({
      name: "",
      email: "",
      phone: "",
      college: "",
      skills: ""
    });

  };

  return (

    <div
      className="
        fixed
        inset-0
        flex
        items-center
        justify-center
        bg-black/50
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          p-8
          w-full
          max-w-lg
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Add Candidate
        </h2>

        <form
          onSubmit={handleSubmit}
          className="
            flex
            flex-col
            gap-4
          "
        >

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="college"
            placeholder="College"
            value={formData.college}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <div
            className="
              flex
              gap-3
              justify-end
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                rounded-xl
                border
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-4
                py-2
                rounded-xl
                text-white
              "
              style={{
                backgroundColor:
                  "#71A5DE"
              }}
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default AddCandidateModal;