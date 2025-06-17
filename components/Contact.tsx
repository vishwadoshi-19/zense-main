import PatientForm from './PatientForm';

export function Contact() {
  return (
    <section id='form' className="text-black bg-white">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Get in Touch</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-6 00 sm:text-xl">Let's explore how we can support you and your loved ones. <br />Fill in the form to reach out to us!</p>
      <PatientForm/>
  </div>
</section>
  )
}

export default Contact
