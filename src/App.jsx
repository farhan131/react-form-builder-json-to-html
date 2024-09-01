import { useState } from "react";
import FormBuilder from "./FormBuilder";

function App() {
  const [form, setForm] = useState({
    saved: false,
    form: [],
  });
  return (
    <>
      <h1>asd</h1>
      <FormBuilder setForm={setForm} />
      {form.saved && console.log(form.form)}
      {form.saved && (
        <form>
          {form.form.map((f, i) => {
            if (f.type === "checkbox-group") {
              return (
                <>
                  <p key={i}>{f.label}</p>
                  {f.values.map((f2, i2) => {
                    return (
                      <>
                        <input
                          key={i2}
                          type="checkbox"
                          name={f.name}
                          id={f.name + i2}
                          value={f2.value}
                          checked={f2.selected ? true : false}
                        />
                        <label key={i2 + "-label"} htmlFor={f.name + i2}>
                          {f2.label}
                        </label>
                      </>
                    );
                  })}
                </>
              );
            }
            if (f.type === "header" || f.type === "paragraph") {
              return `<${f.subtype}>${f.label}</${f.subtype}>`;
            }
            if (f.type === "date") {
              return (
                <>
                  <label key={i}>{f.label}</label>
                  <input
                    type="date"
                    name={f.name}
                    id={f.name + i}
                    placeholder={f.placeholder}
                    required={f.required ? true : false}
                  />
                </>
              );
            }
            if (f.type === "number") {
              return (
                <>
                  <label htmlFor={f.name + i}>{f.label}</label>
                  <input
                    type="number"
                    name={f.name}
                    id={f.name + i}
                    placeholder={f.placeholder}
                    required={f.required ? true : false}
                    min={f.min}
                    max={f.max}
                  />
                </>
              );
            }
            if (f.type === "select") {
              return (
                <>
                  <label htmlFor={f.name + i}>{f.label}</label>
                  <select
                    name={f.name}
                    id={f.name + i}
                    placeholder={f.placeholder}
                    required={f.required ? true : false}
                  >
                    {f.values.map((v, i2) => {
                      return (
                        <option
                          key={i2}
                          value={v.value}
                          selected={v.selected ? true : false}
                        >
                          {v.label}
                        </option>
                      );
                    })}
                  </select>
                </>
              );
            }
            if (f.type === "text") {
              return (
                <>
                  <label htmlFor={f.name + i}>{f.label}</label>
                  <input
                    type={f.subtype}
                    name={f.name}
                    id={f.name + i}
                    placeholder={f.placeholder}
                    required={f.required ? true : false}
                    maxLength={f.maxlength ? f.maxlength : null}
                  />
                </>
              );
            }
          })}
        </form>
      )}
    </>
  );
}

export default App;
