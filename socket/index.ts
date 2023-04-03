import io from "socket.io-client";
const socket = io("https://6eea-103-176-135-206.ngrok.io", {
  extraHeaders: {
    to: "917972287471",
    phone_id: "106886972321301",
    "ngrok-skip-browser-warning": "skip-browser-warning",
    "Content-type": "application/json",
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6InlhMjkuYTBBZWw5c0NNbnlUamE5UDQ5d01CSU9vQVZWdk5wMHFSN3FIZUhHZEFxM3JubWd0Sy1kVFQzelB6X3RycUU1UG5veENpTEMyanBHRnkyVTU0aFBOMTdPV0ExRWYwaGd2QzB4b3NIT3l4ZGtyblhUVXF4Mmw2Z3Q0aVc5Y2M4WVR4ekFnLV9BcGxwZVY5eDNqSWVLQkZVdWpyVXFpS3phQ2dZS0FaWVNBUkVTRlFGNHVkSmhPUmVFeEM1VzZ0c19zbEVIamhwdWV3MDE2MyIsImVtcGxveWVlSWQiOjExMDk4LCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2Nzk5OTE4MzksImV4cCI6MTY4MDU5NjYzOX0.fRdkILHl97lawcoCLhNFzowaz3-kmpS7vineYxjRpPM`,
  },
  reconnection: false,
  autoConnect: false,
});
export default socket;
