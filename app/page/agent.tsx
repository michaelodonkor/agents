'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Textarea } from "@/components/ui/textarea"
import { Database, FileUser, Library, ListX, Loader, LoaderCircle, MapPin, Star, TrashIcon, User, UserRoundMinus, UserRoundPlus, Users } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import axios from 'axios'
import { Separator } from '@/components/ui/separator'
import { DialogClose } from '@radix-ui/react-dialog'

interface Agent {
  id: number
  firstName: string
  lastName: string
  photoUrl: string
  agentLicence: string
  address: string
  practiceAreas: string
  aboutMe: string
  rating: number
  createdAt?: string
}

export const AgentLA = () => {
  const [agents, setAgents] = useState<Agent[]>([])
  const [rating, setRating] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isAddingAgent, setIsAddingAgent] = useState(false)
  const [ld, setld] = useState(false)
  const [ld2, setld2] = useState(false)
  const [newAgent, setNewAgent] = useState({


    firstName: '',
    lastName: '',
    photoUrl: '',
    agentLicence: '',
    address: '',
    practiceAreas: '',
    aboutMe: '',
    rating: 0,
  })

  const filteredAgents = agents.filter(agent =>
    agent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAgent = async () => {
    console.log
    if (hasEmptyValues(newAgent)) return;

    await addAgent({ ...newAgent, id: agents.length + 1 })

    setIsAddingAgent(false)
    setNewAgent({
      firstName: '',
      lastName: '',
      photoUrl: '',
      agentLicence: '',
      address: '',
      practiceAreas: '',
      aboutMe: '',
      rating: 0,
    })
  }

  const handleRateAgent = async (id: number | undefined, rating: number) => {
    const ng = agents.map(agent =>
      agent.id === id ? { ...agent, rating } : agent
    )

    setAgents(ng)

    await updateAgent({
      id: id,
      rating: rating,
    })
    setSelectedAgent((prevo: any) => ({
      ...prevo,
      ["rating"]: rating,
    }))


  }

  const highlightText = (text: string, highlight: string) => {

    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight.trim().toLocaleLowerCase()})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <span key={index} className="bg-gray-200 text-gray-900 px-1  rounded-md">{part}</span> : part
    );
  };

  useEffect(() => {

    getAgents();

  }, [])

  async function getAgents() {
    try {
      const response = await axios.get('/api/get_agents', {});
      // console.log("mm",response.data.agents)

      setAgents(response.data.agents.reverse())

    } catch (error) {
    }
  }


  async function addAgent(data: Agent) {
    try {
      const response = await axios.post('/api/get_agents', data);
      await getAgents();

    } catch (error) {
    }
  }

  async function updateAgent(data: any) {
    try {
      const response = await axios.put('/api/get_agents', data);
      await getAgents();

    } catch (error) {
    }
  }


  async function delAgent(id: number) {
    try {
      // Delete the agent with the specified ID
      await axios.post(`/api/delete`, { id: id });

      // Update the agents list locally
      const updatedAgents = agents.filter(agent => agent.id !== id);
      setAgents(updatedAgents);

      // Refresh the agents list from the server if needed
      await getAgents();
    } catch (error) {
      console.error("Failed to delete agent:", error);
    }
  }
  async function delAllAgent() {
    setld(true)
    try {
      // Delete the agent with the specified ID
      await axios.delete(`/api/delete`);

      // Update the agents list locally

      setAgents([]);

      // Refresh the agents list from the server if needed
      await getAgents();
      setld(false)
    } catch (error) {
      console.error("Failed to delete agents:", error);
      setld(false)
    }
  }





  function hasEmptyValues(obj: any): boolean {
    return Object.values(obj).some(value => value === null || value === undefined || value === '');
  }

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setNewAgent((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  async function loadD() {
    setld2(true)
    await Promise.all([
      addAgent({
        id: agents.length + 1,
        rating: 5,
        firstName: 'Anton',
        lastName: 'Huot',
        photoUrl: 'https://a.storyblok.com/f/191576/1200x800/12d0d08ce3/change_background_color_before_.webp',
        agentLicence: '1234567890',
        address: '908 Bel Air Rd, Los Angeles, CA 90077',
        practiceAreas: 'Los Angeles, San Diego,New York,Miami',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
      }),
      addAgent({
        id: agents.length + 2,
        rating: 4,
        firstName: 'Matthew',
        lastName: 'Wiebe',
        photoUrl: 'https://img.freepik.com/premium-photo/selfie-photo-man-blue-tshirt-isolated-white-background_39688-4898.jpg',
        agentLicence: '0987654321',
        address: '308 Vista De La Playa, La Jolla, CA 92037',
        practiceAreas: 'San Diego',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.'
      }),
      addAgent({
        id: agents.length + 3,
        rating: 2,
        firstName: 'Cayton',
        lastName: 'Heath',
        photoUrl: 'https://thumbs.dreamstime.com/b/portrait-young-guy-allergy-red-face-closeup-portrait-young-guy-allergy-red-face-closeup-167724701.jpg',
        agentLicence: '1234098756',
        address: '6800 Fisher Is Unit 6802 PH-2, Miami Beach, FL 33109',
        practiceAreas: 'Miami, New York',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.'
      }),
      addAgent({
        id: agents.length + 4,
        rating: 3,
        firstName: 'Jordan',
        lastName: 'McQueen',
        agentLicence: '123321890',
        address: '53 W 53rd St, New York, NY 10019, United States',
        practiceAreas: 'New York',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
        photoUrl: 'https://media.istockphoto.com/id/1159632852/photo/close-up-portrait-of-beautiful-young-caucasian-man-with-a-neutral-and-indifferent-serious.jpg?s=612x612&w=0&k=20&c=SIW9aLDjaFBLDoBxWkXQYkr6RU3bHYgRRcZQscEN6wY='
      }),
      addAgent({
        id: agents.length + 5,
        rating: 5,
        firstName: 'Anton',
        lastName: 'Huot',
        photoUrl: 'https://a.storyblok.com/f/191576/1200x800/12d0d08ce3/change_background_color_before_.webp',
        agentLicence: '1234567890',
        address: '908 Bel Air Rd, Los Angeles, CA 90077',
        practiceAreas: 'Los Angeles, San Diego, New York, Miami',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
      }),
      addAgent({
        id: agents.length + 6,
        rating: 2,
        firstName: 'Cayton',
        lastName: 'Heath',
        photoUrl: 'https://thumbs.dreamstime.com/b/portrait-young-guy-allergy-red-face-closeup-portrait-young-guy-allergy-red-face-closeup-167724701.jpg',
        agentLicence: '1234098756',
        address: '6800 Fisher Is Unit 6802 PH-2, Miami Beach, FL 33109',
        practiceAreas: 'Miami, New York',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.'
      }),
      addAgent({
        id: agents.length + 7,
        rating: 3,
        firstName: 'Jordan',
        lastName: 'McQueen',
        agentLicence: '123321890',
        address: '53 W 53rd St, New York, NY 10019, United States',
        practiceAreas: 'New York',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
        photoUrl: 'https://media.istockphoto.com/id/1159632852/photo/close-up-portrait-of-beautiful-young-caucasian-man-with-a-neutral-and-indifferent-serious.jpg?s=612x612&w=0&k=20&c=SIW9aLDjaFBLDoBxWkXQYkr6RU3bHYgRRcZQscEN6wY='
      }),
    ])
    setld2(false)
  }

  return (
    <div className="container lg:w-[31rem] p-4">
      <h1 className='font-extrabold mb-6 text-4xl flex items-center'>
        <Users className='mr-2 !size-8 text-gray-400' />
        Agents
      </h1>
      <div className="flex justify-between items-center mb-4 gap-2">
        <Input
          type="text"
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full shadow-none h-8 placeholder:text-xs"
        />
        {ld ? <></> : <Dialog open={isAddingAgent} onOpenChange={setIsAddingAgent}  >
          <DialogTrigger asChild  >
            <Button className='shadow-none h-8 '><UserRoundPlus /> New Agent </Button>
          </DialogTrigger>

          <DialogContent className='w-[22rem] p-4 !rounded-[1.5rem] '>
            <DialogHeader>
              <DialogTitle className='flex items-center text-lg text-gray-400 gap-2' ><UserRoundPlus className='!size-[1.2rem]' /> New Agent</DialogTitle>
            </DialogHeader>
            <Separator />

            <div className=" flex flex-col gap-4 w-full mt-2">
              <div className='flex gap-4 items-center'>
                <span className='flex flex-col gap-1'>
                  <p className='text-xs  text-gray-500  pl-1 font-bold'>First Name</p>
                  <Input
                    id="firstName"
                    value={newAgent.firstName}
                    placeholder="eg: Mike ..."
                    onChange={handleChange}
                    max={20}
                    className="h-8 shadow-none text-xs placeholder:text-xs"
                  />  </span>
                <span className='flex flex-col gap-1'>
                  <p className='text-xs  text-gray-500  pl-1 font-bold'>Last Name</p>
                  <Input
                    id="lastName"
                    value={newAgent.lastName}
                    placeholder="eg: Dev ..."
                    onChange={handleChange}
                    className="h-8 shadow-none text-xs placeholder:text-xs"
                    max={20}
                  /></span>
              </div>

              <div className='flex gap-4 items-center'>
                <span className='flex flex-col gap-1'>
                  <p className='text-xs  text-gray-500  pl-1 font-bold'>Agent Licence</p>      <Input
                    id="agentLicence"
                    value={newAgent.agentLicence}
                    placeholder="eg: A400011 ...."
                    onChange={handleChange}
                    max={8}
                    className=" h-8 shadow-none text-xs placeholder:text-xs"
                  />
                </span>

                <span className='flex flex-col gap-1'>
                  <p className='text-xs  text-gray-500  pl-1 font-bold'>Practice Areas</p>
                  <Input
                    id="practiceAreas"
                    value={newAgent.practiceAreas}
                    placeholder="eg: Accra/Site ..."
                    max={20}
                    onChange={handleChange}
                    className=" h-8 shadow-none text-xs placeholder:text-xs"
                  />

                </span>
              </div>

              <span className='flex flex-col gap-1'>
                <p className='text-xs  text-gray-500  pl-1 font-bold'>Address</p>
                <Input
                  id="address"
                  value={newAgent.address}
                  placeholder="eg: Street 101 Accra ..."
                  max={15}
                  onChange={handleChange}
                  className=" h-8 shadow-none text-xs placeholder:text-xs"
                />
              </span>
              <span className='flex flex-col gap-1'>
                <p className='text-xs  text-gray-500  pl-1 font-bold'>Image Url</p>  <Input
                  id="photoUrl"
                  value={newAgent.photoUrl}
                  placeholder="eg: https://www.example.com/imagename.jpg"
                  max={50}
                  onChange={handleChange}
                  className=" shadow-none text-xs placeholder:text-xs"
                /></span>


              <span className='flex flex-col gap-1'>
                <p className='text-xs  text-gray-500  pl-1 font-bold'>About Agent</p>


                <Textarea
                  id="aboutMe"
                  maxLength={250}
                  value={newAgent.aboutMe}
                  placeholder="...."
                  onChange={handleChange}
                  className=" h-8 shadow-none text-xs placeholder:text-xs"
                  rows={3}


                /></span>



            </div>
            <div className='flex gap-4 justify-end'>

              <DialogClose>
                <Button variant={"secondary"} className='h-8'>Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddAgent} className='h-8'>Add Agent</Button>
            </div>
          </DialogContent>
        </Dialog>}



      </div>
      {filteredAgents.length > 0 && <div className='bg-gray-100 p-1 rounded-lg flex gap-2 h-9 mb-2 items-center text-xs'>
        {ld ? <span className='flex gap-2' ><LoaderCircle className='animate-spin !size-4 text-black ml-2' /> Deleting All data... </span> :


          //  <Button variant={"outline"} onClick={() => delAllAgent()} className='text-xs h-7' ><ListX className='!size-4' />Delete All Agents</Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"outline"} className='text-xs h-7' ><ListX className='!size-4' />Delete All Agents</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[18rem]'>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently all agents.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => delAllAgent()} > Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


        }

        {ld2 ? <span className='flex gap-2'><LoaderCircle className='animate-spin !size-4 text-black ml-2' /> Adding data... </span> : <Button variant={"outline"} onClick={() => loadD()} className='text-xs h-7' ><Database className='!size-3' />Add More Dummy Data</Button>}



      </div>}

      <div className=" bg-gray-50 rounded-lg p-2 flex  flex-col gap-2 max-h-[70vh] overflow-y-auto">
        {filteredAgents.map(agent => (

          <Dialog >
            <DialogTrigger>
              <Card key={agent.id} className="cursor-pointer w-full p-2 shadow-none hover:border-gray-900 ease-in-out" onClick={() => setSelectedAgent(agent)}>
                <CardContent className="p-0 flex gap-4  items-start justify-start">
                  <img src={agent.photoUrl} alt={`${agent.firstName} ${agent.lastName}`} className="h-12 w-12 bg-gray-300 rounded-full  object-cover " />
                  <div className='flex flex-col gap-0 w-full items-start'>
                    <p className="text-md font-bold ml-1">
                      {highlightText(`${agent.firstName} ${agent.lastName}`, searchTerm)}
                    </p>

                    <p className="flex  mb-2 text-xs gap-2  items-start text-gray-500 bg-gray-50 p-1  rounded-md w-full ">
                      <FileUser className='!size-3 mt-1' />
                      <span className=' w-full lg:w-[20rem] leading-relaxed line-clamp-2 p text-ellipsis text-left overflow-hidden'>
                        {agent.aboutMe}
                      </span>

                    </p>
                    <p className="mb-2 text-[8pt] text-gray-500 leading-relaxed line-clamp-1 p text-ellipsis bg-gray-50 p-1 overflow-hidden rounded-md w-full text-left flex items-center">
                      <MapPin className='!size-3 mr-1' /> {highlightText(agent.practiceAreas, searchTerm)}

                    </p>



                    <div className='flex justify-between items-center w-full'>
                      <p className="text-xs text-gray-500">
                        {timeAgo(agent.createdAt!)}
                      </p>

                      <span className='w-[6rem] flex gap-1 items-center bg-gray-100 px-2   rounded-full'>
                        {[1, 2, 3, 4, 5].map((star) => (

                          <Star
                            className={`w-6 h-6 ${star <= agent.rating ? "text-gray-700 fill-gray-700" : "text-gray-400"
                              } transition-colors`}
                          />

                        ))}
                      </span>

                    </div>

                  </div>

                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="w-[22rem] lg:w-[25rem] p-4 !rounded-[1.5rem]">
              <DialogHeader>
                <DialogTitle className='text-gray-400 '>
                  Details

                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-2">

                <span className='flex gap-2 items-start'>

                  <img src={selectedAgent?.photoUrl} alt={`${selectedAgent?.firstName} ${selectedAgent?.lastName}`} className="w-[4.5rem] h-[4.5rem] object-cover rounded" />
                  <span className='flex flex-col'>
                    <p className='text-md text-gray-700 font-bold mb-1'>
                      {selectedAgent?.firstName} {selectedAgent?.lastName}
                    </p>

                    <p className='w-full  flex flex-col gap-1 text-xs  text-gray-800 bg-gray-50 p-2 rounded-lg'><strong className='text-xs text-gray-500'>Address </strong> {selectedAgent?.address}</p>


                  </span>
                </span>
                <div className='flex flex-col gap-1 text-xs  text-gray-800 bg-gray-50 p-2 rounded-lg'>
                  <strong className='flex gap-2 items-center text-gray-500 text-xs'>  Practice Areas </strong>


                  <div className='flex gap-2 flex-wrap'>
                    {
                      agent.practiceAreas.split(",").map((x, index) => (
                        <p key={index} className="border px-2 rounded-md  text-xs bg-gray-50 flex gap-2 items-center">
                         <MapPin className='!size-2 mr-1 text-gray-400' />  {x}
                        </p>
                      ))
                    }
                  </div>
                </div>

               
                <p className='flex flex-col gap-1 text-xs bg-gray-100 rounded-md p-1' ><strong className=' text-gray-500'>License:</strong> {selectedAgent?.agentLicence}</p>


                <p className='flex flex-col gap-1 text-xs  text-gray-800 bg-gray-100 p-2 rounded-lg'>
                  <strong className='flex gap-2 items-center text-gray-500 text-xs'>  About Me </strong>

                  {selectedAgent?.aboutMe}</p>





                <span className='flex  gap-1 items-center w-full  my-2 justify-between'>

                  {selectedAgent && (<span className='flex bg-gray-100 px-2 rounded-2xl h-10'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => { handleRateAgent(selectedAgent!.id, star) }}
                        className="focus:outline-none "
                      >
                        <Star
                          className={`w-5 h-5 ${star <= selectedAgent!.rating ? "text-gray-500 fill-gray-500" : "text-gray-400"
                            } hover:text-gray-600 transition-colors`}
                        />
                      </button>
                    ))}
                  </span>)}




                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"outline"} className=' bg-red-500 bg-opacity-[0.05] text-rose-500 h-8 shadow-none rounded-lg hover:bg-red-500 hover:text-white' ><UserRoundMinus className='!size-3' /> Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[18rem]'>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently all agents.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <DialogClose>
                          <AlertDialogAction onClick={async () => {
                            await delAgent(agent.id)

                          }} > Continue</AlertDialogAction>

                        </DialogClose>

                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>





                </span>
              </div>

            </DialogContent>


          </Dialog>
        ))}
        {filteredAgents.length < 1 &&

          <p className=' w-full p-4 text-center flex flex-col justify-center items-center font-bold text-gray-500 mt-2 bg-gray-100 rounded-md text-sm ease-in-out'>
            {ld2 ? <span className='w-[10rem] flex items-center gap-2'>

              <LoaderCircle className='animate-spin !size-5 text-black' />

              Loading Data ...</span> :

              <>
                <Library className='!size-[2rem] mb-4' />
                Sorry, No Agents Available !

                <Button variant={"outline"} className='h-8 shadow-none mt-4' onClick={() => loadD()}> <Database className='!size-4' />

                  Load Dummy Data</Button>
              </>}


          </p>}
      </div>

    </div>
  )



  function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
      }
    }

    return "Just now";
  }
}