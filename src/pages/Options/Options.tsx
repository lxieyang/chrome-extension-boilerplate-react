import React from 'react';
import Logo from '../../assets/img/clarifai-logo.jpeg';
import '../../assets/styles/tailwind.css';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <>
      <div className="relative z-10 max-w-3xl mx-auto mt-3 px-5 py-5 text-slate-800">
        <h1 className="text-4xl font-medium mb-10 flex items-end">
          <img className="relative mr-2 w-40" src={Logo} alt="" id="logo" />
          - Internal Docs Tool
        </h1>

        <div className="flex flex-row w-full">
          <aside className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 pr-4 pb-20 border-r border-gray-200">
              <ul className="space-y-2">
                  <li>
                    <a href="#github" id="github-tab" className="tab-link flex items-center p-2 text-base font-normal text-slate-900 rounded-lg hover:bg-gray-100">
                        <svg className="w-6 h-6 text-slate-800 transition duration-75 " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="ml-3">GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a href="#confluence" id="confluence-tab" className="tab-link flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                      <svg className="w-6 h-6 text-slate-800 transition duration-75" fill="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M 36.988281 2.9902344 C 36.519863 3.0093652 36.069688 3.2528906 35.804688 3.6816406 C 35.800688 3.6886406 35.795016 3.6941719 35.791016 3.7011719 C 35.411016 4.3361719 34.921672 5.1619219 34.388672 6.0449219 C 30.470672 13.059922 26.844437 11.486422 20.023438 8.2324219 L 10.609375 4.1308594 C 9.881375 3.7848594 9.0091094 4.0933125 8.6621094 4.8203125 C 8.6541094 4.8343125 8.6485781 4.846375 8.6425781 4.859375 L 4.1210938 14.705078 C 3.8020938 15.435078 4.1275625 16.285188 4.8515625 16.617188 C 6.8375625 17.551188 10.789703 19.411953 14.345703 21.126953 C 27.142703 27.335953 38.016938 26.934063 46.335938 13.414062 C 46.810938 12.641063 47.343875 11.742344 47.796875 11.027344 C 48.201875 10.343344 47.985594 9.4609687 47.308594 9.0429688 L 37.814453 3.2050781 C 37.557203 3.0464531 37.269332 2.9787559 36.988281 2.9902344 z M 21.050781 25.003906 C 14.442609 25.143818 8.6034688 28.546719 3.6640625 36.574219 C 3.1890625 37.347219 2.656125 38.245938 2.203125 38.960938 C 1.798125 39.644937 2.0144063 40.527312 2.6914062 40.945312 L 12.185547 46.783203 C 12.871547 47.206203 13.771312 46.994594 14.195312 46.308594 C 14.199312 46.301594 14.204984 46.294109 14.208984 46.287109 C 14.588984 45.652109 15.078328 44.828312 15.611328 43.945312 C 19.529328 36.930312 23.155563 38.501859 29.976562 41.755859 L 39.390625 45.859375 C 40.118625 46.205375 40.990891 45.896922 41.337891 45.169922 L 41.355469 45.130859 L 45.876953 35.285156 C 46.195953 34.555156 45.870484 33.705047 45.146484 33.373047 C 43.160484 32.439047 39.208344 30.578281 35.652344 28.863281 C 30.454375 26.340062 25.572162 24.908177 21.050781 25.003906 z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Atlassian Confluence</span>
                    </a>
                  </li>
                  <li>
                    <a href="#google_drive" id="google_drive-tab" className="tab-link flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                        <svg className="flex-shrink-0 w-6 h-6 text-slate-800 transition duration-75" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M44.52 28H30.99L17.71 5h11.221c1.429 0 2.749.762 3.464 2L44.52 28zM44.32 31l-5.766 9.998C37.84 42.237 36.519 43 35.089 43H11.71l6.93-12H44.32zM22.21 18.8L9.15 41.42l-5.766-9.99c-.714-1.238-.714-2.762 0-4L15.29 6.81 22.21 18.8z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Google Drive</span>
                    </a>
                  </li>
              </ul>
            </div>
          </aside>

          <div className="w-full pl-6" id="tab-contents">
            <section id="github-view">
              <div className="p-4 w-full bg-white rounded-lg sm:p-6 lg:p-8">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900">Enter your Credentials</h5>
                    <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Your GitHub Username</label>
                      <input type="text" id="githubUsernameInput" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                      <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-900">Your GitHub Token</label>
                      <input type="text" id="githubTokenInput" name="token" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>

                    <button id="saveBtn" type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Token</button>
                </form>
              </div>
            </section>
            <section id="confluence-view">
              <div className="p-4 w-full bg-white rounded-lg sm:p-6 lg:p-8">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900">Provide the Information</h5>
                    <div>
                      <label htmlFor="spaceNameInput" className="block mb-2 text-sm font-medium text-gray-900">Confluence Space Name</label>
                      <input type="text" id="spaceNameInput" name="confluenceSpaceName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>

                    <button id="saveBtn" type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>
              </div>
            </section>
            <section id="google_drive-view">
              <div className="p-4 w-full bg-white rounded-lg sm:p-6 lg:p-8">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900">Provide Credentials for Google Drive</h5>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-white bg-[url(../../assets/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    </>
  );
};

export default Options;
