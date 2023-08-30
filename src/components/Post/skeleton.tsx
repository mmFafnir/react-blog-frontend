import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPost = () => (
    <div className="post">

        <ContentLoader 
            speed={2}
            width={700}
            height={444}
            viewBox="0 0 700 444"
            backgroundColor="#737373"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="NaN" rx="0" ry="0" width="700" height="NaN" /> 
            <rect x="0" y="0" rx="0" ry="0" width="700" height="300" /> 
            <rect x="25" y="331" rx="0" ry="0" width="200" height="19" /> 
            <rect x="25" y="415" rx="0" ry="0" width="108" height="19" /> 
            <rect x="625" y="415" rx="0" ry="0" width="50" height="19" /> 
            <rect x="25" y="361" rx="0" ry="0" width="102" height="19" />
        </ContentLoader>
    </div>
)

export default SkeletonPost
