import team from './../assets/team.png';


const LandPage = () => {
  return (
    <div className='text-white bg-gray-900 h-[auto] w-full flex justify-center items-center lg:gap-10 gap-0 flex-wrap'>
      <h1 className='text-3xl lg:text-6xl lg:w-[40%] w-[70%] mt-20 lg:mt-0'>
        <span className='text-orange-500'>The Only</span> Teacher Commenting Website 
        <span className='text-orange-500'>You</span> Can Find And <span className='text-orange-500'>Need.</span>
      </h1>
      <img src={team} alt="teamImage" className='lg:h-[60vh] h-[80vw] -mt-10 mb-10 lg:mb-0 lg:mt-0'/>
      <div className='h-[30vh] lg:h-[35vh] w-[85%] lg:w-[45vw] bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.6)] transition-hover duration-100 rounded-2xl flex justify-center items-center flex-col mb-5'>
        <h1 className='w-[85%] text-center mb-3 text-xl lg:text-4xl text-orange-500'>Create, Read and Share</h1>
        <p className='w-[85%] text-gray-200'>All about creating the comments, reading them and sharing them. All the teachers you want. Create Teachers, Write a comment about them. Look what people wrote about them. Loved your Java Teacher ? Share what you loved here. This app is all about sharing.</p>
      </div>
      <div className='h-[30vh] lg:h-[35vh] w-[85%] lg:w-[45vw] bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.6)] transition-hover duration-100 rounded-2xl flex justify-center items-center flex-col mb-5'>
        <h1 className='w-[85%] text-center mb-3 text-xl lg:text-4xl text-orange-500'>Honest Opinions</h1>
        <p className='w-[85%] text-gray-200'>Share your honest opinions here. No one is perfect, share what you think about them. Whether it be how good and perfect they are or how they are slacking off in the classroom. This is a place to share your thought openly.</p>
      </div>
      <div className='h-[30vh] lg:h-[35vh] w-[85%] lg:w-[45vw] bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.6)] transition-hover duration-100 rounded-2xl flex justify-center items-center flex-col mb-5'>
        <h1 className='w-[85%] text-center mb-3 text-xl lg:text-4xl text-orange-500'>No data Extracting</h1>
        <p className='w-[85%] text-gray-200'>In this digital world, where every place you visit extracts some form of data from you, not this once. Here you can stay, comment, argue, talk, anything your heart desires and rest assured no data will be extracted or manipulated from or to you. A natural experience if you'd call it.</p>
      </div>
      <div className='h-[30vh] lg:h-[35vh] w-[85%] lg:w-[45vw] bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.6)] transition-hover duration-100 rounded-2xl flex justify-center items-center flex-col mb-5'>
        <h1 className='w-[85%] text-center mb-3 text-xl lg:text-4xl text-orange-500'>Created as a side project</h1>
        <p className='w-[85%] text-gray-200'>This app is created as a side project to learn django with django drf and jwt authentication. Built with React as frontend, TailwindCSS to style the webpage, and django as backend with a SQLite database. This project is primarily focued on the token based authentication and authorization with django drf and django simple jwt.</p>
      </div>
    </div>
  )
}

export default LandPage
