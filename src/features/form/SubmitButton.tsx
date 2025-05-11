import { Button, ButtonProps } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

export const LoadingButton = ({
    loading,
    children,
    className,
    ...props
}: ButtonProps & {
    loading?: boolean;
    success?: string;
}) => {
    return (
        <Button {...props} className={cn(className, "relative")}>
            <motion.span
                animate={{
                    opacity: loading ? 0 : 1,
                    y: loading ? -10 : 0,
                }}
            >
                {children}
            </motion.span>
            <motion.span
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: loading ? 1 : 0,
                    y: loading ? 0 : 10,
                }}
                exit={{
                    opacity: 0,
                    y: 10,
                }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Loader size={20} />
            </motion.span>
        </Button>
    );
};