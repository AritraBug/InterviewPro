import { useState, useEffect } from "react";

function AddCandidateModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      college: "",
      skills: ""
    });

  useEffect(() => {

    if (initialData) {

      setFormData(initialData);

    } else {

      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        skills: ""
      });

    }

  }, [initialData]);

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
          {
            initialData
              ? "Edit Candidate"
              : "Add Candidate"
          }
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
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded-xl"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-xl"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 rounded-xl"
          />

          <input
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College"
            className="border p-3 rounded-xl"
          />

          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills"
            className="border p-3 rounded-xl"
          />

          <div
            className="
              flex
              justify-end
              gap-3
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                border
                px-4
                py-2
                rounded-xl
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