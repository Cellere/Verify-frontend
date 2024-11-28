import { SiSecurityscorecard } from "react-icons/si";

export default function VerifyLogo() {
    return (
        <div className="text-3xl font-extrabold text-primary-500 flex items-center gap-2">
            <SiSecurityscorecard className="text-4xl" />
            <span className="flex items-center relative">
                <span className="relative text-black">
                    Verify<span className='text-primary-500'>.</span>
                </span>
            </span>
        </div>
    );
}
