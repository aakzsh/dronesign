import Header from "../../components/Header/Header";
import Styles from "./Discover.module.css";
import drone1 from "../../assets/images/drone4.jpg";
import techstack from "../../assets/images/techstack.jpg";
import workflow from "../../assets/images/workflow.svg";
import { useEffect, useRef } from "react";

const Discover = () => {
  const whyRegister =
    "Drone registration is required to ensure safety, accountability, and proper management of airspace. It helps integrate drones into the airspace system to prevent collisions, enforce no-fly zones, and promote responsible flying. By linking drones to their owners, registration deters illegal activities, aids in identifying operators in case of accidents or misuse, and supports security measures against malicious uses like smuggling or terrorism. It ensures compliance with legal requirements, enables insurance coverage, and provides data for policy-making and innovation. Additionally, the process often educates operators about drone laws, fostering a safe and regulated drone ecosystem.\n\nMoreover, drone registration encourages the growth of the drone industry by fostering public trust and ensuring accountability in drone operations. It allows authorities to monitor and manage drone traffic efficiently, minimizing risks to both manned and unmanned aircraft. Registration also supports technological advancements, as data collected from registered drones helps shape regulations that balance innovation with safety. For hobbyists and professionals alike, the process ensures they are informed about their responsibilities, promoting ethical and lawful usage of drones while safeguarding public interests.";
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const disclaimer =
    "No, DroneSign is not legally authorized by the government. It is a prototype designed to assist in the process of registering civilian drones and signing agreements. The platform incorporates real-world features such as drone registration and agreement signing, making it a realistic simulation of the actual process. Although not affiliated with the government, DroneSign leverages tools like DocuSign to seamlessly handle electronic signatures, ensuring a smooth and secure signing experience. This approach not only demonstrates the potential for efficient digital workflows in drone registration but also highlights how technology can simplify regulatory procedures. DroneSign is meant to serve as a proof of concept (PoC), showcasing how the registration process could be improved, streamlined, and integrated with existing systems, ultimately helping government bodies in managing drone activities more effectively.";
  const components =
    "DroneSign leverages a combination of powerful tools to create a seamless drone registration and agreement signing experience. At the core of the platform is DocuSign, which serves as the hero component, enabling smooth and secure electronic signatures, OAuth authentication, Click Agreements, and eSignature features. These DocuSign capabilities ensure that all agreements are legally binding and digitally signed with ease, making the process of registering drones and signing official documents both efficient and secure. The app is built using React for a dynamic user interface, powered by Node.js for the backend. Vercel is used for deployment, ensuring high performance and scalability. Firebase handles real-time database operations, while Google Cloud is utilized for reliable storage and cloud-based services. The Gemini API is integrated to assist with AI-powered functionalities, further enhancing the user experience. Additionally, Google Drive Extensions are used to archive documents, and Access Code Identity Verification ensures that only authorized users can register drones. DocuSign ties it all together, providing the critical functionality for secure, streamlined document management and signature collection.";
  useEffect(() => {
    if (window.innerWidth > 600) {
      const div1Height = div1Ref.current.offsetHeight;
      console.log(div1Height);
      div2Ref.current.style.height = `${div1Height}px`;

      const div3Height = div3Ref.current.offsetHeight;
      console.log(div3Height);
      div4Ref.current.style.height = `${div3Height}px`;
    }
  }, []);
  return (
    <>
      <Header />
      <main className={Styles.mainbody}>
        <p className={Styles.discover}>Discover</p>
        <div className={Styles.sectionFull}>
          <p className={Styles.heading}>Workflow Diagram</p>
          <img src={workflow} alt="" className={Styles.image} ref={div4Ref} />
        </div>
        <div className={Styles.content}>
          <div className={Styles.section} ref={div1Ref}>
            <p className={Styles.heading}>Why do we need to register Drones?</p>
            <p className={Styles.bodyText} style={{ whiteSpace: "pre-wrap" }}>
              {whyRegister}
            </p>
          </div>
          <div className={Styles.section}>
            <img
              src={drone1}
              alt=""
              className={Styles.imageHalf}
              ref={div2Ref}
            />
          </div>
          <div className={Styles.sectionFull}>
            <p className={Styles.heading}>
              Is DroneSign legally authorized by government?
            </p>
            <p className={Styles.bodyText} style={{ whiteSpace: "pre-wrap" }}>
              {disclaimer}
            </p>
          </div>
        </div>
        <div className={Styles.content}>
          <div className={Styles.section}>
            <img
              src={techstack}
              alt=""
              className={Styles.imageHalf}
              ref={div4Ref}
            />
          </div>
          <div className={Styles.section} ref={div3Ref}>
            <p className={Styles.heading}>
              What tools are used to create DroneSign?
            </p>
            <p className={Styles.bodyText} style={{ whiteSpace: "pre-wrap" }}>
              {components}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Discover;
