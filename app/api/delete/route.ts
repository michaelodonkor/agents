import sequelize from "@/lib/db";
import Agent from "@/model/agents";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {
      id,
  
    } = await req.json();
  
    try {
      // Syncing the database (This should ideally be done on app initialization)
      await sequelize.sync();
  
      const agent = await Agent.destroy(
      {
        where: { id:id }        // Condition
      });
  
      // Return a successful response with the created agent
      return NextResponse.json({ message: "Agent deleted successfully", agent });
    } catch (error) {
      console.error("Error creating agent:", error);
      return NextResponse.json(
        { error: "Failed to create agent" },
        { status: 500 }
      );
    }
  }

export async function DELETE(req: NextRequest) {

  
    try {
      // Syncing the database (This should ideally be done on app initialization)
      await sequelize.sync();
  
     await  Agent.drop();
  
      // Return a successful response with the created agent
      return NextResponse.json({ message: "Agents deleted successfully" });
    } catch (error) {
      console.error("Error creating agent:", error);
      return NextResponse.json(
        { error: "Failed to create agent" },
        { status: 500 }
      );
    }
  }
  