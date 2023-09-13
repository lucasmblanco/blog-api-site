import React from 'react'

export default function Comments() {
  return (
      <>
          <hr></hr>
          <section className="grid gap-2 py-2">
          <label className="text-sm" htmlFor="comment">what do you think? comment below 👇</label>
              <textarea name="comment" id="comment" cols={30} rows={3} className="bg-black-brown rounded-lg resize-none p-1 active:border-ivory"></textarea>
          </section>
      </>

  )
}
