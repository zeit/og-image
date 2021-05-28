/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';

import { useState } from 'react';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [theme, setTheme] = useState('light');
  const [text, setText] = useState('Hello, World!');
  const [textSize, setTextSize] = useState('5');
  const [images, setImages] = useState([
    'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg',
  ]);
  const [imageSize, setImageSize] = useState('12');

  const url =
    '/api/og-image.png' +
    '?' +
    `theme=${encodeURIComponent(theme)}` +
    '&' +
    `text=${encodeURIComponent(text)}` +
    '&' +
    `text_size=${encodeURIComponent(textSize)}` +
    '&' +
    `img=${images.map((image) => encodeURIComponent(image)).join('&image=')}` +
    '&' +
    `img_size=${encodeURIComponent(imageSize)}`;

  return (
    <main className="mx-6 my-16">
      <Head>
        <title>Open Graph Image as a Service</title>
        <meta
          name="og:image"
          content="/api/og-image.png?text=Open%20Graph%20Image%20as%20a%20Service"
        />
      </Head>
      <h1 className="text-4xl text-center">Open Graph Image as a Service</h1>
      <section className="grid gap-8 p-6 mx-auto shadow-xl max-w-7xl lg:grid-cols-2">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th className="w-1/3">Property</th>
              <th className="w-2/3">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Theme</td>
              <td>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Text</td>
              <td>
                <input
                  placeholder="Hello, World!"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Text Size</td>
              <td>
                <input
                  type="number"
                  value={textSize}
                  onChange={(e) => setTextSize(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Image(s)</td>
              <td>
                {images.map((image, i) => (
                  <input
                    key={image}
                    placeholder="https://image.provider.com/path/to/image.svg"
                    type="text"
                    value={image}
                    onChange={(e) =>
                      setImages(
                        images.map((image, j) => {
                          if (i == j) {
                            return e.target.value;
                          }
                          return image;
                        })
                      )
                    }
                    className="mb-1"
                  />
                ))}
                <div className="flex justify-between">
                  <button
                    onClick={() => setImages(images.slice(0, -1))}
                    className="text-red"
                  >
                    Remove Image
                  </button>
                  <button
                    onClick={() => setImages([...images, ''])}
                    className="text-azure"
                  >
                    Add Image
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Image Size</td>
              <td>
                <input
                  type="number"
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={url} width="1600" height="900" />
        </a>
      </section>
      <section className="mx-auto max-w-prose">
        <h2 className="text-3xl">What is this?</h2>
        <p>
          This is a service that generates dynamic{' '}
          <a href="http://ogp.me" target="_blank" rel="noopener noreferrer">
            Open Graph
          </a>{' '}
          images that you can embed in your <code>&lt;meta&gt;</code> tags.
        </p>
        <p>
          For each keystroke, headless chromium is used to render an HTML page
          and take a screenshot of the result which gets cached.
        </p>
        <p>
          Find out how this works and deploy your own image generator by
          visiting{' '}
          <a
            href="https://github.com/vercel/og-image"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </section>

      <hr className="mx-auto my-8 max-w-prose" />

      <footer className="mx-auto my-4 text-center max-w-prose">
        Proudly hosted on{' '}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          ▲Vercel
        </a>
      </footer>
    </main>
  );
};

export default Home;
