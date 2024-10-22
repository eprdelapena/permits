"use client";

import FormComponent from '@/components/common/forms';
import React, { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router';
import Sec_form1 from '@/components/routes/govinitial/sec/secforms/sec_form1';

const Page = () => {

  const [pathSegments, setPathSegments] = useState<string[]>([]);
  const pathname = usePathname().split("/")[2]

  const governmentAgency: {sec: string, dti: string} = {
    sec: "Securities and Exchange Commission (SEC)",
    dti: "Department of Trade and Industry (DTI)"
  }


  return (
    <>
        { pathname === "sec_application" && <Sec_form1 governmentAgency={governmentAgency.sec} />}
        { pathname === "dti" && <FormComponent governmentAgency={governmentAgency.dti} />}
    </>
  )
}

export default Page;
