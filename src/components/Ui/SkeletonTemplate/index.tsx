import {FC} from 'react';
import ContentLoader from 'react-content-loader';


interface IProps {
    width: string,
    height: string
}
const SkeletonTemplate:FC<IProps>= ({width, height}) => {
    return (
        <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor="#737373"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="0" ry="0" width={width} height={height} /> 
        </ContentLoader>
    )
}

export default SkeletonTemplate