"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useActionState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Fixed import
import { createPitch } from "@/lib/action";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
    pitch: pitch // using your existing pitch state
  });
  const { toast } = useToast();
  const router = useRouter(); // Move router outside of the action

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string, 
        link: formData.get("link") as string,
        pitch,
      }

      // Validate form data
      await formSchema.parseAsync(formValues);
      
      // Clear any previous errors
      setErrors({});
      
      const result = await createPitch(prevState, formData, pitch);

      if (result.status === 'SUCCESS') {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully"
        });

        // Fixed template literal syntax
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        
        // Clear only the invalid fields
        const newFormValues = { ...formValues };
        Object.keys(fieldErrors).forEach(fieldName => {
          newFormValues[fieldName as keyof typeof formValues] = "";
        });
        setFormValues(newFormValues);

        return { 
          ...prevState, 
          error: "Validation failed", 
          status: "ERROR" 
        };
      }
      
      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR"
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div className="space-y-2">
        <label htmlFor="title" className="block startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup title"
          value={formValues.title}
          onChange={(e) => setFormValues(prev => ({
            ...prev,
            title: e.target.value
          }))}
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_input"
          required
          placeholder="Give a brief description of your startup"
          value={formValues.description}
          onChange={(e) => setFormValues(prev => ({
            ...prev,
            description: e.target.value
          }))}
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Specify/Choose your category"
          value={formValues.category}
          onChange={(e) => setFormValues(prev => ({
            ...prev,
            category: e.target.value
          }))}
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="link" className="block startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Put in your image link for the startup"
          value={formValues.link}
          onChange={(e) => setFormValues(prev => ({
            ...prev,
            link: e.target.value
          }))}
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div className="space-y-2" data-color-mode="light">
        <label htmlFor="pitch" className="block startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={formValues.pitch}
          onChange={(value) => setFormValues(prev => ({
            ...prev,
            pitch: value as string
          }))}
          id="pitch"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Please describe your whole idea in detail",
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <button
        type="submit"
        className="startup-form_btn text-white text-justify flex"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </button>
    </form>
  );
};

export default StartupForm;
