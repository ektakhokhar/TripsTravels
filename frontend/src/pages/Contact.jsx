import React from "react";

const Contact = () => {
  return (
    <section className="py-20 bg-slate-100">
      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl mx-4 md:mx-10 lg:mx-24">
        <div className="px-6 py-12 max-w-screen-md mx-auto">
          
          <h2 className="heading text-center text-red-600">
            Contact Us
          </h2>

          <p className="mb-10 font-light text-center paragraph text-gray-600">
            Got any issue? Want to reach us? Let us know.
          </p>

          <form className="space-y-6">
            {/* Email */}
            <div>
              <label className="form_label">Your Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="form_input mt-2"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="form_label">Subject</label>
              <input
                type="text"
                placeholder="How can we help you?"
                className="form_input mt-2"
              />
            </div>

            {/* Message */}
            <div>
              <label className="form_label">Your Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="form_input mt-2 resize-none"
              />
            </div>

            {/* Button – FIXED */}
           <button
  type="submit"
  className="w-full mt-6 bg-red-600 text-white py-3 rounded-full 
             font-semibold hover:bg-red-700 transition"
>
  Send Message
</button>

          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
