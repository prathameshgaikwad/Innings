/* eslint-disable react/prop-types */
const SliderMask = ({ height = "100%", bg, radius, align }) => {
  return (
    <div
      style={{
        backgroundColor: bg || "AppWorkspace",
        width: 120,
        height: height,
        zIndex: 10000,
        position: "absolute",
        maskImage: `linear-gradient(${
          align === "right" ? "90deg" : "-90deg"
        }, transparent, rgba(0,0,0,1))`,
        right: align === "right" ? 0 : undefined,
        left: align === "left" ? 0 : undefined,
        top: 0,
        borderRadius: radius || 0,
      }}></div>
  );
};
export default SliderMask;
