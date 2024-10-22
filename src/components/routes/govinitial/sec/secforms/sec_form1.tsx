"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Define day options (1 to 31)
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const Sec_form1: React.FC<{ governmentAgency: string }> = (props) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        position: '',
        tinPart1: '',
        tinPart2: '',
        tinPart3: '',
        gender: 'male',
        mobileCode: '+63',
        mobile: '',
        phone: '',
        emailAddress: '',
        authorizedRepresentative: '',
        landline: '',
        companyType: 'Stock Corporation',
        companySubtype: 'one_person_corporation',
        companyClassification: 'all_filipinos',
        companySubclass: 'natural_person',
        noOfIncorporators: '',
        majorIndustryClassification: 'Accommodation and Food Service Activities',
        industryClassificationGroup: 'Extraction of crude petroleum',
        totalAuthorizedCapital: '',
        totalSubscribedCapital: '',
        totalPaidUpCapital: '',
        shares: [],
        articlesOfIncorporation: false,
        bylaws: false,
        fiscalYearStart: '',
        fiscalYearEnd: '',
        termOfExistence: '', // Perpetual or years
        businessActivity: '',
        meetingsType: 'Annual',
        meetingsDate: { month: '1', day: '1' },
      });
  const [industryOptions, setIndustryOptions] = useState<string[]>([]);
  
  const handleInputPrimaryPurpose = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const businessActivities = [
    'Retail', 'Wholesale', 'Manufacturing', 'Service', 'Other'
  ];
  
  const meetingTypes = [
    'Annual', 'Regular', 'Special'
  ];

  const handleMeetingsDateChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      meetingsDate: {
        ...prevData.meetingsDate,
        [name]: value,
      },
    }));
  };
  
  const handleInputSecondaryPurpose = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addShareInput = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      shares: [...prevData.shares, { type: '', noOfShares: '', parValue: '', totalAmount: '' }]
    }));
  };

  
  const handleShareInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedShares = [...formData.shares];
    
    // Update the specific share input
    (updatedShares as any)[index] = { ...(updatedShares[index] as any), [name]: value };

    
    // Calculate totalAmount
    if (name === 'noOfShares' || name === 'parValue') {
      const noOfShares = parseFloat((updatedShares[index] as any).noOfShares) || 0;
      const parValue = parseFloat((updatedShares[index] as any).parValue) || 0;
      (updatedShares[index] as any).totalAmount = noOfShares * parValue;
    }
  
    setFormData({ ...formData, shares: updatedShares });
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value, checked } : any = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    if (name === 'majorIndustryClassification') {
        updateIndustryOptions(value);
    }

    if (name === 'fiscalYearStart' && value) {
        const startDate = new Date(value);
        startDate.setDate(startDate.getDate() - 1); // Set to previous day
        const endDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        setFormData((prevData) => ({ ...prevData, fiscalYearEnd: endDate }));
    }
};

  const updateIndustryOptions = (classification: string) => {
    switch (classification) {
      case 'mining_quarrying':
        setIndustryOptions([
          'Extraction of crude petroleum',
          'Extraction of natural gas',
          'Mining and Quarrying n.e.c.',
          'Mining of hard coal',
          'Mining of iron ores',
          'Mining of lignite',
          'Mining of non-ferrous metal ores except precious metals',
          'Quarrying of stone, sand and clay',
          'Support activities for other mining and quarrying',
          'Support activities for petroleum and gas extraction'
        ]);
        break;
      default:
        setIndustryOptions([]); // Reset options for other classifications
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tin = `${formData.tinPart1}-${formData.tinPart2}-${formData.tinPart3}`;
    console.log("Form submitted:", { ...formData, tin });
  };


  return (
    <>
      <div className="space-y-6 p-6 max-w-4xl mx-auto">
        <div className="border border-gray-300 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">{props.governmentAgency}</h3>
          <p className="text-lg font-light mb-4">Please fill-up all data</p>
          
          <form onSubmit={handleSubmit}>
            <h4 className="text-md font-semibold mb-2">Section 1: Applicant / Authorized Representative Details</h4>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
                        <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            
            <label className="text-md font-semibold mb-1">TIN No.</label>
            <div className="flex mb-2">
              <input
                type="text"
                name="tinPart1"
                placeholder="###"
                maxLength={3}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-1/4 mr-1"
                required
              />
              <input
                type="text"
                name="tinPart2"
                placeholder="###"
                maxLength={3}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-1/4 mx-1"
                required
              />
              <input
                type="text"
                name="tinPart3"
                placeholder="###"
                maxLength={3}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-1/4 ml-1"
                required
              />
            </div>

            <select
              name="gender"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="male" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            
            <div className="flex mb-2">
            <select
  name="mobileCode"
  onChange={handleInputChange}
  className="p-2 border border-gray-300 rounded-md w-1/4 mr-2"
  required
>
  <option value="" disabled>Select Country Code</option>
  <option value="+63">+63 (PH)</option>
</select>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />

            <h4 className="text-md font-semibold mb-2 mt-4">Section 2: Company Type</h4>
            <label className="text-md font-semibold mb-1">Company Type</label>
            <select
              name="companyType"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="stock_corporation" disabled>Select Company Type</option>
              <option value="stock_corporation">Stock Corporation</option>
              <option value="non_stock_corporation">Non-stock Corporation</option>
              <option value="foreign_stock">Foreign Stock</option>
              <option value="foreign_non_stock">Foreign Non-stock</option>
              <option value="partnership">Partnership</option>
            </select>

            <label className="text-md font-semibold mb-1">Company Subtype</label>
            <select
              name="companySubtype"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="one_person_corporation" disabled>Select Company Subtype</option>
              <option value="one_person_corporation">One Person Corporation</option>
              <option value="corporation_less_than_5">Corporation with less than 5 Incorporators</option>
              <option value="corporation_5_or_more">Corporation with 5 or more Incorporators</option>
            </select>

            <label className="text-md font-semibold mb-1">Company Classification</label>
            <select
  name="companyClassification"
  onChange={handleInputChange}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  required
>
  <option value="all_filipinos" disabled>Select Company Classification</option>
  <option value="all_filipinos">All Filipinos</option>
  <option value="0_1_to_100_foreign_equity">0.1% to 100% Foreign Equity (FIA)</option>
</select>

            <label className="text-md font-semibold mb-1">Company Subclass</label>
            <select
              name="companySubclass"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="natural_person" disabled>Select Company Subclass</option>
              <option value="natural_person">Natural Person</option>
              <option value="trust_or_state">Trust or State</option>
            </select>

            <label className="text-md font-semibold mb-1">No. of Incorporators</label>
            <input
              type="number"
              name="noOfIncorporators"
              placeholder="No. of Incorporators"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />

            <label className="text-md font-semibold mb-1">Major Industry Classification</label>
            <select
              name="majorIndustryClassification"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="" disabled>Select Major Industry Classification</option>
              <option value="accommodation_and_food">Accommodation and Food Service Activities</option>
              <option value="extra_territorial">Activities of Extra-Territorial Organization and Bodies</option>
              <option value="household_employers">Activities of Households as Employers</option>
              <option value="undifferentiated_goods">Undifferentiated Goods-and Services-Producing Activities of Households for Own Use</option>
              <option value="administrative_support">Administrative and Support Service Activities</option>
              <option value="agriculture_forestry_fishing">Agriculture, Forestry and Fishing</option>
              <option value="arts_entertainment_recreation">Arts, Entertainment and Recreation</option>
              <option value="construction">Construction</option>
              <option value="education">Education</option>
              <option value="electricity_gas_steam">Electricity, Gas, Steam and Air Conditioning Supply</option>
              <option value="financial_insurance">Financial and Insurance Activities</option>
              <option value="human_health_social_work">Human Health and Social Work Activities</option>
              <option value="information_communication">Information and Communication</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="mining_quarrying">Mining and Quarrying</option>
              <option value="other_service_activities">Other Service Activities</option>
              <option value="professional_scientific_technical">Professional, Scientific and Technical Activities</option>
              <option value="public_administration_defense">Public Administration and Defense; Compulsory Social Security</option>
              <option value="real_estate">Real Estate Activities</option>
              <option value="transportation_storage">Transportation and Storage</option>
            </select>

            <label className="text-md font-semibold mb-1">Industry Classification Group</label>
            <select
              name="industryClassificationGroup"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="" disabled>Select Industry Classification Group</option>
              {industryOptions.length > 0 ? (
                industryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))
              ) : (
                <>
                  <option value="food">Food</option>
                  <option value="textiles">Textiles</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                </>
              )}
            </select>

            <h4 className="text-md font-semibold mb-2 mt-4">Section 3: Company Purpose</h4>
<label className="text-md font-semibold mb-1">Primary Purpose</label>
<textarea
  name="primaryPurpose"
  onChange={handleInputPrimaryPurpose}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  rows={6}
  required
  placeholder="Describe the primary purpose of your company here..."
></textarea>

<label className="text-md font-semibold mb-1">Secondary Purpose</label>
<textarea
  name="secondaryPurpose"
  onChange={handleInputSecondaryPurpose}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  rows={6}
  required
  placeholder="Describe the secondary purpose of your company here..."
></textarea>

<h4 className="text-md font-semibold mb-2 mt-4">Section 4: Capital Structure and Other Details</h4>

<label className="text-md font-semibold mb-1">Total Authorized Capital Stock (Php)</label>
<input
  type="number"
  name="totalAuthorizedCapital"
  onChange={handleInputChange}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  required
  placeholder="Enter total authorized capital stock"
/>

<label className="text-md font-semibold mb-1">Total Subscribed Capital Stock (Php)</label>
<input
  type="number"
  name="totalSubscribedCapital"
  onChange={handleInputChange}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  required
  placeholder="Enter total subscribed capital stock"
/>

<label className="text-md font-semibold mb-1">Total Paid-Up Capital Stock (Php)</label>
<input
  type="number"
  name="totalPaidUpCapital"
  onChange={handleInputChange}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  required
  placeholder="Enter total paid-up capital stock"
/>
<h1 className='text-black font-semibold my-2'> Share total amount must be equal to the Total Authorized Capital Stock </h1>
{formData.shares.map((share, index) => (
  <div key={index} className="mb-4 border p-4 rounded-md flex items-center space-x-4">
    <div className="flex-1">
      <label className="text-md font-semibold mb-1">Type of Share</label>
      <input
        type="text"
        name="type"
        value={(share as any).type}
        onChange={(e) => handleShareInputChange(index, e)}
        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter type of share"
        required
      />
    </div>

    <div className="flex-1">
      <label className="text-md font-semibold mb-1">No. of Shares</label>
      <input
        type="number"
        name="noOfShares"
        value={(share as any).noOfShares}
        onChange={(e) => handleShareInputChange(index, e)}
        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter number of shares"
        required
      />
    </div>

    <div className="flex-1">
      <label className="text-md font-semibold mb-1">Par Value</label>
      <input
        type="number"
        name="parValue"
        value={(share as any).parValue}
        onChange={(e) => handleShareInputChange(index, e)}
        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter par value"
        required
      />
    </div>

    <div className="flex-1">
      <label className="text-md font-semibold mb-1">Total Amount</label>
      <input
        type="number"
        name="totalAmount"
        value={(share as any).totalAmount}
        readOnly
        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Total amount will be calculated"
        required
      />
    </div>
  </div>
))}

<button
  type="button"
  onClick={addShareInput}
  className="mb-4 px-4 py-2 text-white bg-green-600 rounded-md"
>
  Add Another Share
</button>

<div className="flex">

  <div className="w-1/2 pl-4">
    <label className="text-md font-semibold mb-1">Additional / Special Provisions (Optional)</label>
    <div className="mb-2">
      <label className="flex items-center">
        <input
          type="checkbox"
          name="articlesOfIncorporation"
          onChange={handleInputChange}
          className="mr-2"
          
        />
        Articles of Incorporation
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          name="bylaws"
          onChange={handleInputChange}
          className="mr-2"
          required
        />
        By-laws
      </label>
    </div>
  </div>
</div>

<h4 className="text-md font-semibold mb-2 mt-4">Fiscal Year Details</h4>
                        <label className="text-md font-semibold mb-1">Fiscal Year Start Date</label>
                        <input
                            type="date"
                            name="fiscalYearStart"
                            onChange={handleInputChange}
                            className="mb-2 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                        <label className="text-md font-semibold mb-1">Fiscal Year End Date</label>
                        <input
                            type="text"
                            name="fiscalYearEnd"
                            value={formData.fiscalYearEnd}
                            readOnly
                            className="mb-2 p-2 border border-gray-300 rounded-md w-full"
                            placeholder="Calculated based on start date"
                        />

<label className="text-md font-semibold mb-1">Term of Existence</label>
<input
  type="number"
  name="termOfExistence"
  onChange={handleInputChange}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  required
  placeholder="Enter term of existence (years or 'Perpetual')"
/>

<label className="text-md font-semibold mb-1">Business Activity</label>
<select
  name="businessActivity"
  onChange={handleInputChange}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  required
>
  <option value="" disabled>Select Business Activity</option>
  {businessActivities.map((activity) => (
    <option key={activity} value={activity}>{activity}</option>
  ))}
</select>

<label className="text-md font-semibold mb-1">Annual/Regular Meetings Type</label>
<select
  name="meetingsType"
  onChange={handleInputChange}
  className="mb-2 p-2 border border-gray-300 rounded-md w-full"
  required
>
  <option value="" disabled>Select Meetings Type</option>
  {meetingTypes.map((type) => (
    <option key={type} value={type}>{type}</option>
  ))}
</select>

<label className="text-md font-semibold mb-1">Annual/Regular Meetings Date</label>
<div className="flex space-x-4 mb-2">
  <select
    name="month"
    onChange={(e) => handleMeetingsDateChange('month', e.target.value)}
    className="p-2 border border-gray-300 rounded-md w-1/2"
    required
  >
    <option value="" disabled>Select Month</option>
    {months.map((month) => (
      <option key={month} value={month}>{month}</option>
    ))}
  </select>

  <select
    name="day"
    onChange={(e) => handleMeetingsDateChange('day', e.target.value)}
    className="p-2 border border-gray-300 rounded-md w-1/2"
    required
  >
    <option value="" disabled>Select Day</option>
    {days.map((day) => (
      <option key={day} value={day}>{day}</option>
    ))}
  </select>
  </div>



            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95"
            >
              Submit
            </button>
          </form>
        </div>

        <Link href="/" className="block text-center mt-4">
          <button className="px-4 py-2 text-white bg-gray-400 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-gray-500 active:scale-95">
            Go Back to Home Page
          </button>
        </Link>
      </div>
    </>
  );
}

export default Sec_form1;
