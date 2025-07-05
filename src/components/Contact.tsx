"use client";

import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useRef, useState } from "react";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(formRef.current!);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! We will contact you soon.",
        });
        formRef.current?.reset();
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to send message",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-primary-blue py-16 px-10 text-blue-50">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Left Side - Text */}
          <div className="md:w-1/2">
            <AnimatedTitle
              title="Cont<b>a</b>ct <br /> Us"
              className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9] text-left"
            />
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 w-full">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green text-black placeholder-grey-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green text-black placeholder-grey-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green text-black placeholder-grey-400"
                  placeholder="Suggestions and input :)"
                ></textarea>
              </div>

              <Button
                type="submit"
                title={isSubmitting ? "Sending..." : "Submit"}
                disabled={isSubmitting}
                containerClass={`mt-6 hover:scale-105 transition-transform w-full md:w-auto ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />

              {submitStatus && (
                <div
                  className={`mt-4 p-3 rounded ${
                    submitStatus.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
