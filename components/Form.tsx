import React from 'react'


interface RootLayoutProps {
  type: string
  post: {prompt: string, tag:string}
  setPost: any
  submitting: boolean
  handleSubmit: string
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: RootLayoutProps) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text, text-left'>
        <span className='blue_gradient'> {type} Post </span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, let your imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2x1 flex flex-col gap7 glassmorphism'
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
        </label>
        <textarea 
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value})} 
          placeholder='Write your prompt here'
          className="form_textarea"
          >
        </textarea>
      </form>
    </section>
  )
}

export default Form