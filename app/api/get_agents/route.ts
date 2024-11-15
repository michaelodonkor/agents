import sequelize from "@/lib/db";
import Agent from "@/model/agents";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Syncing the database (This should ideally be done on app initialization)
    await sequelize.sync();

    // Create a new agent

    const agents = await Agent.findAll();

    // Return a successful response with the created agent
    return NextResponse.json({"agents": agents });
  } catch (error) {
    console.error("Error creating agent:", error);
    return NextResponse.json(
      { error: "Failed to create agent" },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  const {
    id,
    firstName,
    lastName,
    photoUrl,
    agentLicence,
    address,
    practiceAreas,
    aboutMe,
    rating,
  } = await req.json();

  try {
    // Syncing the database (This should ideally be done on app initialization)
    await sequelize.sync();

    // Create a new agent

    // const agent = await Agent.create({
    //   firstName: 'Anton',
    //   lastName: 'Huot',
    //   photoUrl: 'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ',
    //   agentLicence: '1234567890',
    //   address: '908 Bel Air Rd, Los Angeles, CA 90077',
    //   practiceAreas: ['Los Angeles', 'San Diego', 'New York', 'Miami'].join(','),
    //   aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    // });



    const agent = await Agent.create({
      id: id,
      firstName: firstName,
      lastName: lastName,
      photoUrl:
      photoUrl,
      agentLicence: agentLicence,
      address:address,
      practiceAreas: practiceAreas,
      aboutMe: aboutMe,
      rating: rating,
    });

    // Return a successful response with the created agent
    return NextResponse.json({ message: "Agent created successfully", agent });
  } catch (error) {


    console.error("Error creating agent:", error);
    return NextResponse.json(
      { error: "Failed to create agent" },
      { status: 500 }
    );
  }
}



export async function PUT(req: NextRequest) {
  const {
    id,
  rating,
  } = await req.json();

  try {
    // Syncing the database (This should ideally be done on app initialization)
    await sequelize.sync();

    // Create a new agent

    // const agent = await Agent.create({
    //   firstName: 'Anton',
    //   lastName: 'Huot',
    //   photoUrl: 'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ',
    //   agentLicence: '1234567890',
    //   address: '908 Bel Air Rd, Los Angeles, CA 90077',
    //   practiceAreas: ['Los Angeles', 'San Diego', 'New York', 'Miami'].join(','),
    //   aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    // });



    const agent = await Agent.update({
      rating: rating,
    }, {
      where: { id:id }        // Condition
    });

    // Return a successful response with the created agent
    return NextResponse.json({ message: "Agent created successfully", agent });
  } catch (error) {
    console.error("Error creating agent:", error);
    return NextResponse.json(
      { error: "Failed to create agent" },
      { status: 500 }
    );
  }
}


