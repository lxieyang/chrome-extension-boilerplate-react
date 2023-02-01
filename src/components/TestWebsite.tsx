import React, { useEffect } from "react";
import ContentContainer, { ContentContainerProps } from "./ContentContainer";

export interface TestWebpageProps {
    children: React.ReactElement;
    backgroundColor?: string;
    // For UI testing
    containerProps: ContentContainerProps;
}
// A lorem ipsum website
export default function TestWebpage({children, backgroundColor, containerProps}) {
    const [visible, setVisible] = React.useState(true);
    const [disabled, setDisabled] = React.useState(false);

    useEffect(() => {
        console.log("visibility changed")
        setVisible(containerProps._visible || false);
        setDisabled(containerProps._disabled || false);
    }, [containerProps._visible, containerProps._disabled]);


    return <div style={{backgroundColor: backgroundColor}}>
        <div>
        <h1>Lorem Ipsum</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies
            tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec
            ultricies tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod,
            nisl nec ultricies tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed
            euismod, nisl nec ultricies tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget
            nisl. Sed euismod, nisl nec ultricies tincidunt, nunc nisl aliquam mauris, eget aliquet nisl
            nunc eget nisl. Sed euismod, nisl nec ultricies tincidunt, nunc nisl aliquam mauris, eget
            aliquet nisl nunc eget nisl. Sed euismod, nisl nec ultricies tincidunt, nunc nisl aliquam
            mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec ultricies tincidunt, nunc nisl
            aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec ultricies tincidunt,
            nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec ultricies
            tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec
            </p>
        </div>
        <ContentContainer _visible={visible} _disabled={disabled}>
            <p>Test</p>
        </ContentContainer>
    </div>
    }