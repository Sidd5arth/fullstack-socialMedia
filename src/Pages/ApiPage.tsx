// import React from 'react'
// import OpenAI from 'openai';

// type Props = {}

// const ApiPage = (props: Props) => {

// const openai = new OpenAI({
//   apiKey: "123123",
//   dangerouslyAllowBrowser: true
// });

// async function main() {
//     const response = await openai.images.generate({
//         model: "dall-e-2",
//         prompt: "a white siamese cat",
//         n: 1,
//         size: "1024x1024",
//       });
//       const image_url = response;
//       console.log(image_url)
// }
// const handleClick = () => {
//     main();
// }
//   return (
//     <div className='w-full h-full'>
//         <textarea className='h-full w-full'></textarea>
//         <button onClick={handleClick} className='border'>send</button>
//     </div>
//   )
// }

// export default ApiPage