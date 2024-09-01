import $ from "jquery";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

window.jQuery = $;
window.$ = $;

const formData = [];

const FormBuilder = ({ setForm }) => {
  const fb = useRef(null);

  useEffect(() => {
    const loadFormBuilder = async () => {
      await import("jquery-ui-sortable");
      await import("formBuilder");

      const formBuilderInstance = $(fb.current).formBuilder({
        formData,
        disableFields: [
          "autocomplete",
          "button",
          "file",
          "hidden",
          "radio-group",
          "textarea",
        ],
        disabledAttrs: [
          "access",
          "className",
          "name",
          "other",
          "inline",
          "toggle",
          "description",
          "value",
          "step",
          "multiple",
        ],
        disabledSubtypes: {
          text: ["color"],
        },
      });

      $(fb.current).on("click", ".save-template", function () {
        const formData = formBuilderInstance.actions.getData("json");
        // console.log("Saved form data:", JSON.parse(formData));
        setForm({ saved: true, form: JSON.parse(formData) });
        // You can perform any other actions here, like sending the data to a server
      });
    };

    loadFormBuilder();
  }, []); // Empty dependency array to run the effect only once

  return <div id="fb-editor" ref={fb} />;
};

FormBuilder.propTypes = {
  setForm: PropTypes.func.isRequired,
};

export default FormBuilder;
