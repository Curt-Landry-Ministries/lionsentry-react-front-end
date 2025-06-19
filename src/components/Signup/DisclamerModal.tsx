import { useState } from "react";
import Button from "../Global/Button";
import Modal from "../Global/Modal";

interface Props {
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
}
const DisclamerModal: React.FC<Props> = ({
  isOpen,
  isLoading,
  onConfirm,
  onClose,
}) => {
  const [acknowledge, setAcknowledge] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setAcknowledge(false);
        onClose();
      }}
      hasCloseButton={true}
    >
      <div className="max-w-[80vw] overflow-y-scroll max-h-[70vh] flex flex-col gap-2 [&>ol>li>span]:my-3 [&>ol>li>span]:block [&>ol>li>ul]:pl-5 [&>ol>li>ul]:list-disc mobile-only:p-4">
        <h3 className="font-semibold">
          Artificial Intelligence Data Collection Disclaimer
        </h3>
        <p>
          This website utilizes an artificial intelligence system that collects,
          processes, and analyzes personal data to enhance user experience,
          provide personalized content, and improve our services. By accessing
          or using this website, you expressly and freely consent to the
          collection and use of your data as described in this disclaimer,
          including the indemnification provisions detailed below.
        </p>
        <ol className="list-decimal pl-5">
          <li>
            <span className="font-semibold">Data Collection and Usage</span>
            <ul>
              <li>
                Our AI system may collect personal data, which can include
                browsing behavior, device information, IP addresses, and any
                other information you voluntarily provide.
              </li>
              <li>
                The collected data is used for analytics, service improvement,
                personalization, and to ensure the security and functionality of
                our website.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Data Security and Storage</span>
            <ul>
              <li>
                We implement industry-standard security measures to protect your
                personal data from unauthorized access, alteration, disclosure,
                or destruction.
              </li>
              <li>
                Despite these efforts, no system is completely secure, and we
                cannot guarantee absolute protection against breaches.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">
              Compliance with Data Protection Laws
            </span>
            <ul>
              <li>
                We process your personal data in accordance with applicable data
                protection and privacy laws.
              </li>
              <li>
                For detailed information about the data we collect and how it is
                processed, please refer to our Privacy Policy.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Consent and User Rights</span>
            <ul>
              <li>
                By using this website, you are expressly and freely providing
                your informed consent to the collection, processing, and
                analysis of your personal data by our AI system, as described in
                this disclaimer and our Privacy Policy.
              </li>
              <li>
                You acknowledge that you have been provided with clear and
                comprehensive information regarding our data practices, and that
                your consent is given voluntarily without any coercion.
              </li>
              <li>
                You agree to access or use this website solely for lawful
                purposes. You further represent and warrant that your activities
                on this website will comply with all applicable local, state,
                national, and international laws, regulations, and ordinances.
                Any use of the website for illegal or unauthorized purposes is
                strictly prohibited.
              </li>
              <li>
                You have the right to access, correct, or request deletion of
                your personal data, subject to certain legal limitations.
                Instructions for exercising these rights are provided in our
                Privacy Policy.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Limitation of Liability</span>
            <ul>
              <li>
                While we take precautions to safeguard your personal data, you
                acknowledge that the AI system’s data collection and processing
                may carry inherent risks.
              </li>
              <li>
                We disclaim all liability for any loss, damage, or misuse of
                your personal data arising from the use of our AI system, except
                where such liability is required by applicable law.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Indemnification</span>
            <ul>
              <li>
                You agree to indemnify, defend, and hold harmless Curt Landry
                Ministries International, Inc., its affiliates, platforms,
                officers, directors, employees, and agents from any and all
                claims, liabilities, damages, losses, or expenses (including
                reasonable attorneys&apos; fees) arising out of or in any way
                connected with your use of the AI system or your breach of this
                disclaimer.
              </li>
              <li>
                This indemnification obligation applies to any actions, claims,
                or demands made by third parties resulting from your use of the
                system or your violation of any applicable law.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">No Legal Advice</span>
            <ul>
              <li>
                This disclaimer is provided for informational purposes only and
                does not constitute legal advice.
              </li>
              <li>
                If you have any concerns or require advice regarding data
                protection and privacy matters, please consult a qualified legal
                professional.
              </li>
            </ul>
          </li>
        </ol>
        <p>
          By continuing to use our website, you agree to the terms of this
          disclaimer. If you do not agree with our data collection practices or
          indemnification requirements, please discontinue use of the website
          and refer to our Privacy Policy for information on how to opt out
          where applicable.
        </p>
        <h4 className="text-xl font-semibold">CONTENT DISCLAIMER</h4>
        <p>
          The information contained in this website, its affiliates, and
          platforms are provided to users for informational purposes only and
          does not constitute medical or psychological advice, nor is the
          transmission or receipt of such information intended to create a
          patient-client relationship between this service and the user or
          browser. Although it is our goal to provide quality information, we
          expressly disclaim all liability to any person(s) who, upon reliance
          on the information provided in this website, any of its services,
          products, apps, or artificial intelligence decisions, takes or fails
          to takeanyparticularaction. Those who are having suicidal thoughts or
          a mental health crisis should seek immediate help from a mental health
          professional or qualified counselor. Additionally, anyone taking
          prescription medications or under the care of the physician, should
          consult with their physician and not take themselves off of any
          prescribed medicines without proper supervision of a physician.
          Furthermore, Curl Landry Ministries, its affiliates and platforms
          makes no claims, promises, warranties or guarantees about the
          accuracy, completeness, or adequacy of the information contained in or
          linked to this website, services, products, apps, or artificial
          intelligence decisions.
        </p>
        <p className="italic font-semibold">
          For any questions or further clarification regarding this disclaimer
          or our data collection practices, please contact{" "}
          <a href="mailto:info@curtlandry.com" className="text-blue">
            info@curtlandry.com
          </a>
          .
        </p>
        <p>
          By continuing to use our website, you agree to the terms of these
          disclaimers. If you do not agree with our data collection practices,
          please discontinue use of the website and refer to our Privacy Policy
          for information on how to opt out where applicable.
        </p>

        <label className="sm:text-sm rounded-lg block w-full self-start">
          <input
            type="checkbox"
            className="mr-3 bg-white dark:bg-dark-mode-subtle w-4 h-4 border"
            onChange={(e) => setAcknowledge(e.currentTarget.checked)}
            checked={acknowledge}
          />
          <span>I acknowledge and agree to the terms outlined above.</span>
        </label>
      </div>
      <Button
        standardBtn={"primary"}
        onClick={onConfirm}
        className="self-start mt-4"
        disabled={!acknowledge || isLoading}
      >
        Confirm
      </Button>

      <Button standardBtn={"text"} onClick={onClose} className="text-sm ml-4">
        I don&apos;t agree
      </Button>
    </Modal>
  );
};

export default DisclamerModal;
