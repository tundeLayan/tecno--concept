import React, { Suspense } from "react";


const WithSuspense = (Component: React.FC) => (props: any) =>
  (
    <Suspense fallback={<h1>Loading</h1>}>
      <Component {...props} />
    </Suspense>
  );

export default WithSuspense;
