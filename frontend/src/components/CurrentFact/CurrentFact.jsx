import React from 'react';
import {FaCopy} from "react-icons/fa";

const CurrentFact = ({data}) => {
    const handleCopy = () => {
        // Prepare the text to be copied to the clipboard
        const keyFacts = data?.keyFacts?.map(el => `- ${el}`).join('\n') || '';
        const references = data?.references?.map(el => `${el.title} (${el.url})`).join('\n') || '';

        const textToCopy = `
      Claim: ${data.title}
      Truth status: ${data.truthStatus}
      Severity: ${data.severity}
      Explanation: ${data.explanation}
      Key Facts:
      ${keyFacts}
      
      References:
      ${references}
    `;

        // Copy the text to the clipboard
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Added fact!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };
    return (
        <>
            {data ? <div className="bg-[var(--card-bg)] p-8 rounded-[20px] shadow-lg  mb-2 fade-in" id="fact-check-result">
                <h3>Fact Check Result:</h3>
                <div className="result-item">
                    {data.content ? <pre style={{whiteSpace:"pre-wrap",
                        wordBreak:"break-word",fontFamily:"'Roboto', sans-serif"}}>{data.content}</pre>: <>
                        <h4>Claim: {data.title}</h4>
                        <p className={`rating ${String(data.truthStatus)}`}>
                            Truth status:{String(data.truthStatus)}</p>
                        <p className="severity high">Severity: {data.severity}</p>
                        <p>Explanation: {data.explanation}</p>
                        <div className="key-facts">
                            <h4>Key Facts:</h4>
                            <ul>
                                {data?.keyFacts?.map(el => <li>{el}</li>)}
                            </ul>
                        </div>
                        <ul className={"mb-1"}>
                            {data.references?.map((el, index) => {
                                return <li key={index}>
                                    <a className={"text-primary"} target={"_blank"} rel='noopener noreferrer'
                                       href={el?.url}>{el?.title}</a>
                                </li>
                            })}
                        </ul>
                        <button
                            className="cursor-pointer text-primary text-[35px] transition-opacity duration-300 hover:opacity-70"
                            onClick={handleCopy}
                        >
                            <FaCopy/>
                        </button>
                    </>}
                </div>
            </div> : ""}
        </>
    );
};

export default CurrentFact;